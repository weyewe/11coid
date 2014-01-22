class Draft < ActiveRecord::Base
  belongs_to :job
  belongs_to :user
  
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
  
  def assign_user
    self.user_id  = self.job.user_id
    self.save 
  end
  
  def self.can_create_object?( job_id ) 
    job_object = Job.find_by_id job_id
    
    return false if job_object.nil? 
    
    job_object.drafts.where(:is_cleared => false).count == 0 
  end

  def self.create_object( params ) 
    
    new_object = self.new
    new_object.job_id = params[:job_id]
    new_object.description = params[:description]
    new_object.dispatched_at = params[:dispatched_at]
    
    if not self.can_create_object?( params[:job_id])
      new_object.errors.add(:generic_errors, "Tidak bisa create draft. Ada draft yang belum di selesaikan")
      return new_object
    end
    
    
    if new_object.save 
      new_object.assign_code
      new_object.assign_user 
    end
    
    return new_object 
  end

  def update_object( params ) 
    self.job_id = params[:job_id]
    self.description = params[:description]
    self.dispatched_at = params[:dispatched_at]
    self.save
  end
  
  def is_last_draft?
    return true if self.job.drafts.count == 1 
    
    return true if  self.job.drafts.order("id DESC").first.id == self.id 
    
    return false 
  end

  def delete_object
    self.destroy  if ( self.is_last_draft? and not self.is_cleared? )  
    
    self.errors.add(:generic_errors, "Tidak bisa delete draft yang sudah selesai")
    return self 
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
    if not self.is_finished?
      self.errors.add(:generic_errors, "Harus diselesaikan terlebih dahulu")
      return self 
    end
    
    if not submitted_datetime.present? 
      self.errors.add(:submitted_at, "Harus ada waktu selesai external")
      return self
    end
    
    self.is_submitted = true 
    self.submitted_at = submitted_datetime
    
    self.save
  end
  
  def clear( cleared_datetime  , clearance_status)
    
    if not self.is_submitted?
      self.errors.add(:generic_errors, "Harus di submit terlebih dahulu")
      return self 
    end
    
    if not cleared_datetime.present? 
      self.errors.add(:cleared_at, "Harus ada waktu selesai external")
      return self
    end
    
    
    if not clearance_status.present? or 
        not [ CLEARANCE_STATUS[:approved],
          CLEARANCE_STATUS[:rejected]].include?( clearance_status.to_i )
      
      self.errors.add(:clearance_status, "Harus ada status penyelesaian")
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
  
  def self.clearables
    self.joins(:job => [:user, :job_code]).where(:is_cleared => false, :is_submitted => true)
  end
  
  def self.submittables
    self.joins(:job=> [:user, :job_code]).where(:is_cleared => false, :is_submitted => false, :is_finished => true )
  end
  
  def self.on_progress
    self.joins(:job=> [:user, :job_code] ).where(:is_cleared => false, :is_submitted => false, :is_finished => false )
  end
end
