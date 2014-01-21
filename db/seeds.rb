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
  admin1 = admin 
  
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

  
  
  
  # ["data_entry1@gmail.com", "data_entry2@gmail.com", "admin2@gmail.com", "admin@gmail.com", "admin4@gmail.com", "admin3@gmail.com"]
  
  worker_array = [
      {
        :name => "Rahmat Agung Saputra",
        :email => "ragustra@11ina.com"
      },
      {
        :name => "Muhammad Muluk",
        :email => "muhammad.muluk@11ina.com"
      },
      {
        :name => "Intan Rosemarry",
        :email => "intan.rosemarry@11ina.com"
      },
      {
        :name => "Lydia Naftalia",
        :email => "lydia.naftalia@11ina.com"
      },
      {
        :name => "Al Hakim",
        :email => "alhakim@11ina.com"
      },
      {
        :name => "Said Alan Ramadhan",
        :email => "s.alanramadhan@11ina.com"
      },
      {
        :name => "Ken Girisya",
        :email => "ken.girisya@11ina.com"
      },
      {
        :name => "Winardi",
        :email => "winardi@11ina.com"
      },
    ] 
    
  worker_array.each do |x|
    data_entry2 = User.create_object(:job_status => USER_JOB_STATUS[:worker], 
                  :name => x[:name], 
                  :email => x[:email], 
                  :password => 'willy1234', 
                  :password_confirmation => 'willy1234',
                  :role_id => data_entry_role.id )

    data_entry2.password = 'willy1234'
    data_entry2.password_confirmation = 'willy1234'
    data_entry2.save
  end
  
  
  

  user_array = [admin, data_entry1 ]
 
  main_page_job_code_master = [
      {
        :code => 'EMB01-100',
        :description => "Top Banner"
      },
      {
        :code => 'EMB01-200',
        :description => "GNB Banner"
      },
      {
        :code => 'EMB01-300',
        :description => "All Category Nav Banner"
      },
      {
        :code => 'EMB01-400',
        :description => "Left Wing Banner"
      },
      {
        :code => 'EMB02-100',
        :description => "Main Billboard"
      },
      {
        :code => 'EMB02-200',
        :description => "Deals"
      },
      {
        :code => 'EMB02-300',
        :description => "Meta Category  Nav Banner"
      },
      {
        :code => 'EMB03-100',
        :description => "Hot Promo Banner"
      }
    ]
    
  level_1_job_code_master = [
      {
        :code => 'CMB01-100',
        :description => "Main Billboard"
      },
      {
        :code => 'EMB02-100',
        :description => "Seller Promo Banner"
      },
      {
        :code => 'EMB03-100',
        :description => "Item Collection Banner"
      } 
    ]
    
  seller_newsletter_job_code_master = [
      {
        :code => 'SNL01-100',
        :description => "Seller Newsletter Billboard"
      },
      {
        :code => 'SNL02-100',
        :description => "Seller Newsletter Graphic"
      } 
    ]
      
  promo_job_code_master = [
      {
        :code => 'PRB01-100',
        :description => "Promo Zone Main Billboard"
      },
      {
        :code => 'PRB01-210',
        :description => "Promo Banner Image"
      },
      {
        :code => 'PRB01-220',
        :description => "Promo Banner Image"
      },
      {
        :code => 'PRB02-100',
        :description => "Banner Promo Point"
      },
      {
        :code => 'PRB02-200',
        :description => "Banner Promo Token"
      },
      {
        :code => 'PRB03-100',
        :description => "Promo Basic Banner"
      },
    ]
    
  seller_zone_job_code_master = [
      {
        :code => 'SBZ01-100',
        :description => "Seller Zone Billboard Banner"
      } 
    ]
  
  
  job_code_1 = JobCode.all[1]


  job_code_2 = JobCode.all[2]
  
  job_code_3 = JobCode.all[3]
  
  
  # # make job
  # (1..20).each do |x|
  #   Job.create_object(
  #     :user_id => admin1.id ,
  #     :job_code_id =>  job_code_2.id ,
  #     :description => "Test job #{x}",
  #     :dispatched_at => DateTime.now
  #   )
  # 
  # 
  # end
  # 
  # (1..20).each do |x|
  #   Job.create_object(
  #     :user_id => admin2.id ,
  #     :job_code_id =>  job_code_2.id ,
  #     :description => "Test job #{x}",
  #     :dispatched_at => DateTime.now
  #     )
  # end
  
  
  
  
  
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

