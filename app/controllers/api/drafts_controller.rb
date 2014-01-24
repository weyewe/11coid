class Api::DraftsController < Api::BaseApiController
  
  def index
    
    # render :json => { :group_loans => @objects , :total => @total , :success => true }
 
    if params[:livesearch].present? 
      livesearch = "%#{params[:livesearch]}%"
      @objects = Draft.where{
        (
          (name =~  livesearch )
        )
        
      }.page(params[:page]).per(params[:limit]).order("id DESC")
      
      @total = Draft.where{ 
        (
          (name =~  livesearch )
        )
      }.count
      
      # calendar
      
    elsif params[:parent_id].present?
      @objects = Draft.includes(:job ).where(:job_id => params[:parent_id]).page(params[:page]).per(params[:limit]).order("id DESC")
      @total = Draft.count
    else
      @objects = []
      @total = 0 
    end
    
    
  end

  def create
    params[:draft][:dispatched_at] =  parse_datetime_from_client_booking( params[:draft][:dispatched_at] )
    params[:draft][:finished_at] =  parse_datetime_from_client_booking( params[:draft][:finished_at] )
    params[:draft][:submitted_at] =  parse_datetime_from_client_booking( params[:draft][:submitted_at] )
    params[:draft][:cleared_at] =  parse_datetime_from_client_booking( params[:draft][:cleared_at] )
    
    @object = Draft.create_object( params[:draft] )
    if @object.errors.size == 0 
      render :json => { :success => true, 
                        :drafts => [
                          
                            :id 							=>  	@object.id  ,
                          	:job_id 			=>     @object.job.id   ,
                          	:job_code 		=> 	  @object.job.code  ,
                          	:description => @object.description   ,
                          	:dispatched_at => format_datetime_friendly(@object.dispatched_at)   ,
                          	:finished_at => format_datetime_friendly(@object.finished_at)   ,
                          	:submitted_at => format_datetime_friendly(@object.submitted_at)   , 
                          	:cleared_at => format_datetime_friendly(@object.cleared_at)   ,
                          	:clearance_status => @object.clearance_status,
                          	:clearance_status_text => @object.clearance_status_text
                          ] , 
                        :total => Draft.active_objects.count }  
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
    @object = Draft.find(params[:id])  
    
    
    params[:draft][:dispatched_at] =  parse_datetime_from_client_booking( params[:draft][:dispatched_at] )
    params[:draft][:finished_at] =  parse_datetime_from_client_booking( params[:draft][:finished_at] )
    params[:draft][:submitted_at] =  parse_datetime_from_client_booking( params[:draft][:submitted_at] )
    params[:draft][:cleared_at] =  parse_datetime_from_client_booking( params[:draft][:cleared_at] )
    
    if params[:update_finished_at].present?
      @object.finish( params[:draft][:finished_at])
    elsif params[:update_submitted_at].present?
      @object.submit( params[:draft][:submitted_at])
    elsif params[:update_cleared_at].present?
      @object.clear( params[:draft][:cleared_at], params[:draft][:clearance_status])
    else
      @object.update_object( params[:draft] ) 
    end
   
     
    if @object.errors.size == 0 
      render :json => { :success => true,   
                        :drafts => [
                          
                          :id 							=>  	@object.id  ,
                        	:job_id 			=>     @object.job.id   ,
                        	:job_code 		=> 	  @object.job.code  ,
                        	:description => @object.description ,
                        	:dispatched_at => format_datetime_friendly(@object.dispatched_at)   ,
                        	:finished_at => format_datetime_friendly(@object.finished_at)   ,
                        	:submitted_at => format_datetime_friendly(@object.submitted_at)   , 
                        	:cleared_at => format_datetime_friendly(@object.cleared_at)  ,
                        	:clearance_status => @object.clearance_status,
                        	:clearance_status_text => @object.clearance_status_text 
                        ],
                        :total => Draft.active_objects.count  } 
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
    @object = Draft.find_by_id params[:id]
    render :json => { :success => true, 
                      :drafts => [@object] , 
                      :total => Draft.count }
  end

  def destroy
    @object = Draft.find(params[:id])
    @object.delete_object 

    if not @object.persisted?  
      render :json => { :success => true, :total => Draft.active_objects.count }  
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
      @objects = Draft.where{ (code =~ query)   
                              }.
                        page(params[:page]).
                        per(params[:limit]).
                        order("id DESC")
                        
      @total = Draft.where{ (code =~ query)  
                              }.count
    else
      @objects = Draft.where{ (id.eq selected_id)  
                              }.
                        page(params[:page]).
                        per(params[:limit]).
                        order("id DESC")
   
      @total = Draft.where{ (id.eq selected_id)   
                              }.count 
    end
    
    
    render :json => { :records => @objects , :total => @total, :success => true }
  end
end
