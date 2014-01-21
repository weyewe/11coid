class Api::JobsController < Api::BaseApiController
  
  def index
    
    if params[:livesearch].present? 
      livesearch = "%#{params[:livesearch]}%"
      @objects = Job.includes(:job_code, :user).where{
        (
          (code =~  livesearch ) | 
          (description =~ livesearch) | 
          ( user.name =~ livesearch)
        )
        
      }.page(params[:page]).per(params[:limit]).order("id DESC")
      
      @total = Job.where{
        (
          (code =~  livesearch ) | 
          (description =~ livesearch) | 
          ( user.name =~ livesearch)
        )
      }.count
      
      # calendar
    
    elsif params[:is_assigned_job].present?
      @objects = Job.includes(:job_code, :user).where(:user_id => current_user.id).page(params[:page]).per(params[:limit]).order("id DESC")
      @total = Job.where(:user_id => current_user.id).count
    else
      puts "Inside the normal index"
      @objects = Job.includes(:job_code, :user).page(params[:page]).per(params[:limit]).order("id DESC")
      @total = Job.count 
    end
     
    # render :json => { :group_loans => @objects , :total => @total , :success => true }
  end

  def create
    # @object = Job.new(params[:job])
    
    params[:job][:dispatched_at] =  parse_datetime_from_client_booking( params[:job][:dispatched_at] )
 
    @object = Job.create_object( params[:job] )
    if @object.errors.size == 0 
      render :json => { :success => true, 
                        :job_codes => [
                          
                            :id 							=>  	@object.id                  ,
                          	:code 			=>     @object.code   ,
                          	:description 		=> 	  @object.description   ,
                          	:dispatched_at => format_datetime_friendly(@object.dispatched_at) 
                          ] , 
                        :total => Job.active_objects.count }  
    else
      msg = {
        :success => false, 
        :message => {
          :errors => extjs_error_format( @object.errors )  
        }
      }
      
      render :json => msg                         
    end
  end

  def update
    @object = Job.find(params[:id])  
    @object.update_object( params[:job] ) 
     
    if @object.errors.size == 0 
      render :json => { :success => true,   
                        :job_codes => [
                          
                          :id 							=>  	@object.id                  ,
                        	:code 			=>     @object.code   ,
                        	:description 		=> 	  @object.description  ,
                        	:total_job 				=> 	  @object.jobs.count   ,
                        	:dispatched_at => format_datetime_friendly(@object.dispatched_at)   
                        ],
                        :total => Job.active_objects.count  } 
    else
      msg = {
        :success => false, 
        :message => {
          :errors => extjs_error_format( @object.errors )  
        }
      }
      
      render :json => msg
      
      
    end
  end
  
  def show
    @object = Job.find_by_id params[:id]
    render :json => { :success => true, 
                      :job_codes => [@object] , 
                      :total => Job.count }
  end

  def destroy
    @object = Job.find(params[:id])
    @object.delete_object 

    if not @object.persisted?  
      render :json => { :success => true, :total => Job.active_objects.count }  
    else
      msg = {
        :success => false, 
        :message => {
          :errors => extjs_error_format( @object.errors )  
        }
      }
      
      render :json => msg
    end
  end
  
  
  def search
    search_params = params[:query]
    selected_id = params[:selected_id]
    if params[:selected_id].nil?  or params[:selected_id].length == 0 
      selected_id = nil
    end
    
    query = "%#{search_params}%"
    # on PostGre SQL, it is ignoring lower case or upper case 
    
    if  selected_id.nil?
      @objects = Job.where{ (code =~ query)   
                              }.
                        page(params[:page]).
                        per(params[:limit]).
                        order("id DESC")
                        
      @total = Job.where{ (code =~ query)  
                              }.count
    else
      @objects = Job.where{ (id.eq selected_id)  
                              }.
                        page(params[:page]).
                        per(params[:limit]).
                        order("id DESC")
   
      @total = Job.where{ (id.eq selected_id)   
                              }.count 
    end
    
    
    render :json => { :records => @objects , :total => @total, :success => true }
  end
end
