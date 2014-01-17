role = {
  :system => {
    :administrator => true
  }
}

admin_role = Role.create!(
  :name        => ROLE_NAME[:admin],
  :title       => 'Administrator',
  :description => 'Role for administrator',
  :the_role    => role.to_json
)

role = {
  :passwords => {
    :update => true 
  },
  :works => {
    :index => true, 
    :create => true,
    :update => true,
    :destroy => true,
    :work_reports => true ,
    :project_reports => true ,
    :category_reports => true 
  },
  :projects => {
    :search => true 
  },
  :categories => {
    :search => true 
  }
}

data_entry_role = Role.create!(
  :name        => ROLE_NAME[:data_entry],
  :title       => 'Data Entry',
  :description => 'Role for data_entry',
  :the_role    => role.to_json
)



# if Rails.env.development?

=begin
  CREATING THE USER 
  
  admin = User.create_main_user(  :name => "Admin2", :email => "admin2@gmail.com" ,:password => "willy1234", :password_confirmation => "willy1234") 
  admin.set_as_main_user
  
  admin = User.create_main_user(  :name => "Admin4", :email => "admin4@gmail.com" ,:password => "willy1234", :password_confirmation => "willy1234") 
  admin.set_as_main_user
=end

  admin = User.create_main_user(:job_status => USER_JOB_STATUS[:observer],  :name => "Admin", :email => "admin@gmail.com" ,:password => "willy1234", :password_confirmation => "willy1234") 
  admin.set_as_main_user
  
  admin = User.create_main_user(:job_status => USER_JOB_STATUS[:observer],  :name => "Admin 2", :email => "admin2@gmail.com" ,:password => "willy1234", :password_confirmation => "willy1234") 
  admin.set_as_main_user
  
  admin = User.create_main_user(:job_status => USER_JOB_STATUS[:observer],  :name => "Admin 3", :email => "admin3@gmail.com" ,:password => "willy1234", :password_confirmation => "willy1234") 
  admin.set_as_main_user
  
  admin = User.create_main_user(:job_status => USER_JOB_STATUS[:observer],  :name => "Admin 4", :email => "admin4@gmail.com" ,:password => "willy1234", :password_confirmation => "willy1234") 
  admin.set_as_main_user


  data_entry1 = User.create_object(:job_status => USER_JOB_STATUS[:observer], :name => "Data Entry 1", :email => "data_entry1@gmail.com", 
                :password => 'willy1234', 
                :password_confirmation => 'willy1234',
                :role_id => data_entry_role.id )
              
  data_entry1.password = 'willy1234'
  data_entry1.password_confirmation = 'willy1234'
  data_entry1.save

  data_entry2 = User.create_object(:job_status => USER_JOB_STATUS[:observer], :name => "Data Entry 2", :email => "data_entry2@gmail.com", 
                :password => 'willy1234', 
                :password_confirmation => 'willy1234',
                :role_id => data_entry_role.id )
              
  data_entry2.password = 'willy1234'
  data_entry2.password_confirmation = 'willy1234'
  data_entry2.save
  
  
  # ["data_entry1@gmail.com", "data_entry2@gmail.com", "admin2@gmail.com", "admin@gmail.com", "admin4@gmail.com", "admin3@gmail.com"]
  


  user_array = [admin, data_entry1, data_entry2]
 
  
  
  job_code_1 = JobCode.create_object(
    :code => "EMC2001",
    :description => "Top banner"
  )


  job_code_2 = JobCode.create_object(
    :code => "EMC3002",
    :description => "Bottom banner"
  )
  
  job_code_3 = JobCode.create_object(
    :code => "EMC1001",
    :description => "Side banner"
  )
  
  
  # make job
  Job.create_object(
    :user_id => data_entry2.id ,
    :job_code_id =>  job_code_2.id ,
    :description => "Test job 1",
    :dispatched_at => DateTime.now
  )
  
  
  
  def make_date(*args)
    now = DateTime.now  
  
    d = ( args[0] || 0 )
    h = (args[1]  || 0)  
    m = (args[2] || 0)  
    s = (args[3] || 0)  
  
  
    target_date = ( now  + d.days + h.hours + m.minutes + s.seconds   ) .new_offset( Rational(0,24) ) 
  
    adjusted_date = DateTime.new( target_date.year, target_date.month, target_date.day, 
                                  h, 0 , 0 
              ) .new_offset( Rational(0,24) ) 
  
    # return ( now  + d.days + h.hours + m.minutes + s.seconds   ) .new_offset( Rational(0,24) ) 
    return adjusted_date 
  end

  def make_date_mins(*args)
    now = DateTime.now  
  
    d = ( args[0] || 0 )
    h = (args[1]  || 0)  
    m = (args[2] || 0)  
    s = (args[3] || 0)  
  
  
    target_date = ( now  + d.days + h.hours + m.minutes + s.seconds   ) .new_offset( Rational(0,24) ) 
  
  
    # what is being adjusted 
    adjusted_date = DateTime.new( target_date.year, target_date.month, target_date.day, 
                                  target_date.hour, target_date.minute , target_date.second
              ) .new_offset( Rational(0,24) ) 
  
    return adjusted_date
  end
    
 
# end

