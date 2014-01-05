class Job < ActiveRecord::Base
  belongs_to :category
  belongs_to :user 
  belongs_to :client
  
  has_many :drafts 
  
  
  def self.create_object( params ) 
  end
  
  def update_object( params ) 
  end
  
  def delete_object
  end
end
