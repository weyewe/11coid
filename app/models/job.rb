class Job < ActiveRecord::Base
  belongs_to :job_code 
  belongs_to :user 
  belongs_to :client
  
  has_many :drafts 
   
  validates_presence_of :job_code_id
  validates_presence_of :user_id 
  validates_presence_of :description 
  
  validate :valid_job_code
  validate :valid_user
  
  def valid_job_code
    return if not all_fields_present? 
    
    if JobCode.where(:id => self.job_code_id).count == 0 
      self.errors.add(:job_code_id , "JobCode ID Invalid")
      return self
    end
  end
  
  def valid_user
    return if not all_fields_present? 
    
    if User.where(:id => self.user_id).count == 0 
      self.errors.add(:user_id , "User ID Invalid")
      return self
    end
  end
  
  def all_fields_present?
    job_code_id.present? and
    user_id.present? and 
    description.present? 
  end
  
  def assign_code
    string = "#{self.created_at.year}/#{self.created_at.month}/#{self.id}"
    self.code = string 
    self.save 
  end
  
  def self.create_object( params ) 
    new_object           = self.new
    # new_object.code      = params[:code].to_s.upcase
    new_object.user_id = params[:user_id]
    new_object.job_code_id = params[:job_code_id]
    new_object.description   = params[:description] 
    new_object.dispatched_at   = params[:dispatched_at] 
    

    if new_object.save
      new_object.assign_code 
      Draft.create_object(
        :description => new_object.description, 
        :user_id => new_object.user_id ,
        :job_id => new_object.id ,
        :dispatched_at => params[:dispatched_at] 
      )
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
