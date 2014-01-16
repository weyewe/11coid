class Draft < ActiveRecord::Base
  belongs_to :job
  
  validates_presence_of :job_id 
  validates_presence_of :description 
  
  def all_fields_present?
    job_id.present? and 
    description.present? 
  end
  
  def assign_code
    rev_code = self.job.drafts.count 
    
    if rev_code == 1 
      self.code = "#{self.job.code}"
    else
      self.code = "#{self.job.code}/#{rev_code - 1}"
    end
    
    self.save 
  end

  def self.create_object( params ) 
    new_object = self.new
    new_object.job_id = params[:job_id]
    new_object.description = params[:description]
    new_object.dispatched_at = params[:dispatched_at]
    
    if new_object.save 
      new_object.assign_code
    end
    
    return new_object 
  end

  def update_object( params ) 
    self.job_id = params[:job_id]
    self.description = params[:description]
    self.dispatched_at = params[:dispatched_at]
    self.save
  end

  def delete_object
    self.destroy 
  end
  
  def self.active_objects
    self
  end
  
  def finish( finished_datetime)
    
    if not finished_datetime.present? 
      self.errors.add(:finished_at, "Harus ada waktu selesai")
      return self
    end
    
    self.is_finished = true 
    self.finished_at = finished_datetime
    
    self.save 
  end
  
  def submit( submitted_datetime )
    if not submitted_datetime.present? 
      self.errors.add(:submitted_at, "Harus ada waktu selesai external")
      return self
    end
    
    self.is_submitted = true 
    self.submitted_at = submitted_datetime
    
    self.save
  end
  
  def clear( cleared_datetime  , clearance_status)
    if not cleared_datetime.present? 
      self.errors.add(:cleared_at, "Harus ada waktu selesai external")
      return self
    end
    
    self.is_cleared = true 
    self.cleared_at = cleared_datetime
    self.clearance_status = clearance_status
    
    self.save
  end
  
  def clearance_status_text
    if  self.clearance_status == CLEARANCE_STATUS[:approved]
      return "OK"
    elsif self.clearance_status == CLEARANCE_STATUS[:rejected]
      return "Fail"
    end
    
    return ""
      
     
  end
end
