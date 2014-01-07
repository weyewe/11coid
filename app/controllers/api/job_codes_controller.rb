class Api::JobCodesController < Api::BaseApiController
  
  def index
    
    if params[:livesearch].present? 
      livesearch = "%#{params[:livesearch]}%"
      @objects = JobCode.joins(:jobs).where{
        (
          (name =~  livesearch )
        )
        
      }.page(params[:page]).per(params[:limit]).order("id DESC")
      
      @total = JobCode.where{
        (
          (name =~  livesearch )
        )
      }.count
      
      # calendar
      
    else
      puts "Inside the normal index"
      @objects = JobCode.page(params[:page]).per(params[:limit]).order("id DESC")
      @total = JobCode.count 
    end
    
    puts "============> Inside the job code\n"*10
    puts "Total job code: @total => #{@total}"
    puts "Total job code: @objects.count => #{@objects.count}"
    
    
    # render :json => { :group_loans => @objects , :total => @total , :success => true }
  end

  def create
    # @object = JobCode.new(params[:job_code])
 
    @object = JobCode.create_object( params[:job_code] )
    if @object.errors.size == 0 
      render :json => { :success => true, 
                        :job_codes => [
                          
                            :id 							=>  	@object.id                  ,
                          	:code 			=>     @object.code   ,
                          	:description 		=> 	  @object.description   
                          ] , 
                        :total => JobCode.active_objects.count }  
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
    @object = JobCode.find(params[:id])  
    @object.update_object( params[:job_code] ) 
     
    if @object.errors.size == 0 
      render :json => { :success => true,   
                        :job_codes => [
                          
                          :id 							=>  	@object.id                  ,
                        	:name 			=>     @object.name   ,
                        	:id_number 		=> 	  @object.id_number  ,
                        	:address 				=> 	  @object.address      ,
                        	:is_deceased			  =>   	@object.is_deceased     ,
                        	:is_run_away		    =>   	@object.is_run_away     ,
                        	:deceased_at       =>   	format_date_friendly( @object.deceased_at )   ,
                        	:run_away_at       =>     format_date_friendly( @object.run_away_at )
                        	
                        ],
                        :total => JobCode.active_objects.count  } 
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
    @object = JobCode.find_by_id params[:id]
    render :json => { :success => true, 
                      :job_codes => [@object] , 
                      :total => JobCode.count }
  end

  def destroy
    @object = JobCode.find(params[:id])
    @object.delete_object 

    if not @object.persisted?  
      render :json => { :success => true, :total => JobCode.active_objects.count }  
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
      @objects = JobCode.where{ (name =~ query)   
                              }.
                        page(params[:page]).
                        per(params[:limit]).
                        order("id DESC")
                        
      @total = JobCode.where{ (name =~ query)  
                              }.count
    else
      @objects = JobCode.where{ (id.eq selected_id)  
                              }.
                        page(params[:page]).
                        per(params[:limit]).
                        order("id DESC")
   
      @total = JobCode.where{ (id.eq selected_id)   
                              }.count 
    end
    
    
    render :json => { :records => @objects , :total => @total, :success => true }
  end
end