class Api::JobSummariesController < Api::BaseApiController
  
  def index
    
    if params[:is_clearable].present?
      handle_clearables(params)
    end
    
    if params[:is_submittable].present?
      handle_submittables(params)
    end
    
    if params[:is_finishable].present?
      handle_on_progress(params)
    end
  end
  
  def handle_clearables(params)
    if params[:livesearch].present? 
      livesearch = "%#{params[:livesearch]}%"
      @objects = Draft.clearables.where{
        (
          (job.code =~  livesearch ) | 
          (job.description =~  livesearch ) | 
          ( job.user.name =~ livesearch )
        )

      }.page(params[:page]).per(params[:limit]).order("id DESC")

      @total = Draft.clearables.where{
        (
          (job.code =~  livesearch ) | 
          (job.description =~  livesearch ) | 
          ( job.user.name =~ livesearch )
        )

      }.count
    else
      @objects = Draft.clearables.page(params[:page]).per(params[:limit]).order("id DESC")
      @total = Draft.clearables.count
    end
  
  end
  
  def handle_submittables(params)
    if params[:livesearch].present? 
      livesearch = "%#{params[:livesearch]}%"
      @objects = Draft.submittables.where{
        (
          (job.code =~  livesearch ) | 
          (job.description =~  livesearch ) | 
          ( job.user.name =~ livesearch )
        )

      }.page(params[:page]).per(params[:limit]).order("id DESC")

      @total = Draft.submittables.where{
        (
          (job.code =~  livesearch ) | 
          (job.description =~  livesearch ) | 
          ( job.user.name =~ livesearch )
        )

      }.count
    else
      @objects = Draft.submittables.page(params[:page]).per(params[:limit]).order("id DESC")
      @total = Draft.submittables.count
    end
    
  end
  
  def handle_on_progress(params)
    if params[:livesearch].present? 
      livesearch = "%#{params[:livesearch]}%"
      @objects = Draft.on_progress.where{
        (
          (job.code =~  livesearch ) | 
          (job.description =~  livesearch ) | 
          ( job.user.name =~ livesearch )
        )

      }.page(params[:page]).per(params[:limit]).order("id DESC")

      @total = Draft.on_progress.where{
        (
          (job.code =~  livesearch ) | 
          (job.description =~  livesearch ) | 
          ( job.user.name =~ livesearch )
        )

      }.count
    else
      @objects = Draft.on_progress.page(params[:page]).per(params[:limit]).order("id DESC")
      @total = Draft.on_progress.count
    end
    
  end

   
end
