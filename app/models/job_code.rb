class JobCode < ActiveRecord::Base
  attr_accessible :code, :description 
  
  has_many :jobs
  
  validates_presence_of :code 
  validates_uniqueness_of :code 
  
  def self.has_job_code?( code ) 
    self.where(:code =>  code.to_s.upcase ).count != 0 
  end
  
  def self.create_object( params ) 
    new_object           = self.new
    new_object.code      = params[:code].to_s.upcase
    new_object.description   = params[:description] 
    
    if  params[:code].present? and 
        self.has_job_code?(params[:code])
      new_object.errors.add(:code, "Sudah ada Job dengan code #{params[:code].to_s.upcase}")
      return new_object
    end

    new_object.save
    
    return new_object
  end
  
  
  
  def has_jobs?
    self.jobs.count != 0 
  end
  
  def update_object(params)
    
    
    if  params[:code].present? and  
        params[:code].to_s.upcase != self.code  and 
        self.has_jobs? 
      self.errors.add(:code, "Sudah ada #{self.jobs.count} job dengan code ini")
      return self 
    end
    
    self.code = params[:code].to_s.upcase 
    self.description = params[:description]
    self.save  
  end
  
  def delete_object
    
    if self.has_jobs?
      self.errors.add(:generic_errors, "Sudah ada #{self.jobs.count} dengan code ini")
      return self 
    end
  end 
  
  
  def self.active_objects
    self 
  end
end
