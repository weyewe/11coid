class Api::DraftsController < Api::BaseApiController
  
  def index
    @objects = Draft.includes(:job, :user).page(params[:page]).per(params[:limit]).order("id DESC")
    @total = Draft.count  
    # render :json => { :group_loans => @objects , :total => @total , :success => true }
  end

  def create
    # @object = Draft.new(params[:draft])
    #  
    #  
    # json.job_id          object.job.id
    # json.job_code      object.job.code
    # json.user_name        object.user.name 
    # json.user_id       object.user.id
    # 
    # json.description object.description
    # 
    # 
    @object = Draft.create_object( params[:draft] )
    if @object.errors.size == 0 
      render :json => { :success => true, 
                        :drafts => [
                          
                            :id 							=>  	@object.id  ,
                          	:job_id 			=>     @object.job.id   ,
                          	:job_code 		=> 	  @object.job.code  ,
                          	:user_name  => @object.user.name      ,
                          	:user_id  => @object.user.id          , 
                          	:description => @object.description    
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
    @object.update_object( params[:draft] ) 
     
    if @object.errors.size == 0 
      render :json => { :success => true,   
                        :drafts => [
                          
                          :id 							=>  	@object.id  ,
                        	:job_id 			=>     @object.job.id   ,
                        	:job_code 		=> 	  @object.job.code  ,
                        	:user_name  => @object.user.name      ,
                        	:user_id  => @object.user.id          , 
                        	:description => @object.description   
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
