class Api::EmployeesController < Api::BaseApiController
  
  def index
    
    if params[:livesearch].present? 
      livesearch = "%#{params[:livesearch]}%"
      @objects = User.workers.where{
        (is_deleted.eq false) & 
        (
          (name =~  livesearch ) | 
          (email =~  livesearch )
        )
        
      }.page(params[:page]).per(params[:limit]).order("id DESC")
      
      @total = User.workers.where{
        (is_deleted.eq false) & 
        (
          (name =~  livesearch ) | 
          (email =~  livesearch )
        )
        
      }.count
    else
      @objects = User.workers.page(params[:page]).per(params[:limit]).order("id DESC")
      @total = User.workers.count
    end
    
     
  end 
end
