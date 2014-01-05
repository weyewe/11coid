class Draft < ActiveRecord::Base
  belongs_to :job
  belongs_to :category
  belongs_to :user 
  belongs_to :client 

  def self.create_object( params ) 
  end

  def update_object( params ) 
  end

  def delete_object
  end
end
