class Draft < ActiveRecord::Base
  belongs_to :job
  
  validates_presence_of :job_id 
  validates_presence_of :description 
  
  def all_fields_present?
    job_id.present? and 
    description.present? 
  end

  def self.create_object( params ) 
    new_object = self.new
    new_object.job_id = params[:job_id]
    new_object.description = params[:description]
    new_object.save 
    
    return new_object 
  end

  def update_object( params ) 
    self.job_id = params[:job_id]
    self.description = params[:description]
    self.save
  end

  def delete_object
    self.destroy 
  end
end
