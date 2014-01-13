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
  
  def self.create_object( params ) 
    new_object           = self.new
    # new_object.code      = params[:code].to_s.upcase
    new_object.user_id = params[:user_id]
    new_object.job_code_id = params[:job_code_id]
    new_object.description   = params[:description] 
    

    if new_object.save
      Draft.create_object(
        :description => new_object.description,
        :job_id => new_object.id,
        :user_id => new_object.user_id 
      )
    end
    
    return new_object
  end
  
  
  
  def has_jobs?
    self.jobs.count != 0 
  end
  
  def update_object(params)
     
    
    self.job_code_id = params[:job_code_id]
    self.description = params[:description]
    self.user_id    = params[:user_id]
    if self.save  
      first_draft.description = self.description
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
