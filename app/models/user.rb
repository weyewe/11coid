class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include TheRoleUserModel
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable #,   :token_authenticatable
         
  before_save :ensure_authentication_token
  
  has_many :jobs
  
  def ensure_authentication_token
    if authentication_token.blank?
      self.authentication_token = generate_authentication_token
    end
  end

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :name , :role_id
  
  validates_uniqueness_of :email 
  validates_presence_of :email  , :role_id 
  
  validate :valid_role
  
  def valid_role
    
    return if not role_id.present?
    
    if role_id == 0
      errors.add(:role_id, "Role harus dipilih")
    end
  end
  
  def self.create_main_user(params) 
    new_user = User.new( :email => params[:email], 
                            :password => params[:password],
                            :password => params[:password_confirmation] ,
                            :name => params[:name])
                      
  
    admin_role = Role.find_by_name ROLE_NAME[:admin]
    new_user.role_id = admin_role.id 
    new_user.is_main_user = true
    
    new_user.job_status = params[:job_status]
    
    new_user.save 
  
    return new_user 
  end
  
  def self.active_objects
    self.where(:is_deleted => false).order("id DESC")
  end
  
  def delete_object 
    
    random_password                    = UUIDTools::UUID.timestamp_create.to_s[0..7]
    self.password = random_password
    self.password_confirmation = random_password 
    self.is_deleted = true 
    self.save 
    
  end
  
  def self.job_status_valid?(job_status)
    job_status.present? and 
    [
      USER_JOB_STATUS[:worker],
      USER_JOB_STATUS[:observer]
      ].include?( job_status.to_i)
  end
  
  def User.create_object(params)
    # only used in seeds.rb => we need to assign pre-determined password
    
    
    new_object                        = User.new 
    password                         = UUIDTools::UUID.timestamp_create.to_s[0..7]
    new_object.name                  = params[:name]
    new_object.email                 = params[:email] 
    new_object.role_id               =   params[:role_id]
    
    new_object.password              = password
    new_object.password_confirmation = password 
    
    new_object.job_status   = params[:job_status]
    
    if not self.job_status_valid?( params[:job_status])
      new_object.errors.add(:job_status, "Job Status tidak valid")
      return new_object 
    end
    
    new_object.save

    
     
    
    if new_object.valid? and Rails.env.production? 
      # UserMailer.notify_new_user_registration( new_object , password    ).deliver 
    end
    return new_object
    
  end
   
  def update_object( params )
    admin_role = Role.find_by_name ROLE_NAME[:admin]
    
    self.name                  = params[:name]
    self.email                 = params[:email] 
    self.job_status   = params[:job_status]
    
    if not self.class.job_status_valid?( params[:job_status])
      self.errors.add(:job_status, "Job Status tidak valid")
      return self 
    end
    
    
    if  self.is_main_user == true  
      self.role_id               = admin_role.id    
    else
      self.role_id = params[:role_id]
    end 
    
    self.save
    return self
  end
  
  
  
  def update_password(  params) 
    self.password = params[:password]
    self.password_confirmation = params[:password_confirmation]
    
    self.save 
    
    return self 
    
  end
  
  def reset_password( employee, params ) 
    password                   = UUIDTools::UUID.timestamp_create.to_s[0..7]
    self.password              = password
    self.password_confirmation = password 
    
    if self.save
      # UserMailer.notify_reset_password( employee, self , password    ).deliver
    end
    
    return self
  end
  
  def set_as_main_user 
    admin_role = Role.find_by_name ROLE_NAME[:admin]
    self.role_id = admin_role.id 
    self.is_main_user = true 
    self.save 
  end
  
  def job_status_text
    if  self.job_status == USER_JOB_STATUS[:observer]
      return "Observer"
    elsif self.job_status == USER_JOB_STATUS[:worker]
      return "Worker"
    end
    
    return ""
  end
  
  private

  def generate_authentication_token
    loop do
      token = Devise.friendly_token
      break token unless User.where(authentication_token: token).first
    end
  end
end
