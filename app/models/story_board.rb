class StoryBoard < ActiveRecord::Base
  belongs_to :user 
  has_many :revisions 
  
   
  def assign_code
    string = "#{self.dispatched_at.year}/#{self.dispatched_at.month}/#{self.id}"
    self.code = string 
    self.save 
  end
  
  def self.create_object( params ) 
    new_object           = self.new
    new_object.artwork_count = params[:artwork_count]
    new_object.dispatched_at   = params[:dispatched_at] 
    new_object.brief   = params[:brief] 
    new_object.user_id   = params[:user_id] 
    
    new_object.is_priority   = params[:is_priority] 
    new_object.due_date   = params[:due_date] 
    
    new_object.status = params[:status]
    new_object.parent_story_board_id   = params[:parent_story_board_id]
    
    

    if new_object.save
      new_object.assign_code 
    end
    
    return new_object
  end
  
  
  
  def has_jobs?
    self.jobs.count != 0 
  end
  
  def first_draft
    self.drafts.order("id ASC").first 
  end
  
  def update_object(params)
    self.job_code_id = params[:job_code_id]
    self.description = params[:description]
    self.user_id    = params[:user_id]
    self.dispatched_at = params[:dispatched_at]
    
    if self.save  
      first_draft.description = self.description
      first_draft.dispatched_at = self.dispatched_at
      first_draft.save  
    end
  end
  
  def delete_object
    self.drafts.each {|x| x.delete_object }
    
    self.destroy 
  end 
  
  
  def self.active_objects
    self 
  end
  
  
   
end
