require 'rubygems'
require 'pg'
require 'active_record'
require 'csv'

class Report
  
  def format_datetime_friendly( datetime ) 
    return nil if datetime.nil? 
     
    
    a = datetime.in_time_zone("Jakarta")
    day = a.day
    month = a.month
    year = a.year
    hour = a.hour
    minute = a.min
    second = a.sec 
    
    if day.to_s.length == 1 
      day = "0#{day}"
    end
    
    if month.to_s.length == 1 
      month = "0#{month}"
    end
    
    if hour.to_s.length == 1
      hour  = "0#{hour}"
    end
    
    if minute.to_s.length == 1 
      minute = "0#{minute}"
    end
    
    if second.to_s.length == 1 
      second = "0#{second}"
    end
    
    return a.strftime("%A") + " #{year}/#{month}/#{day}" + " " + 
            "#{hour}:#{minute}:#{second}"
  end
  
  def extract_amount( value) 
    return BigDecimal('0') if not value.present? 
      
    
    if value.is_a? String
      value = value.gsub(',', '')
      return BigDecimal( value ) 
    elsif value.is_a? Integer
      return BigDecimal( value.to_s)
    end
    
    return BigDecimal('0')
  end
  
  def parse_date( date_string) 
    return nil if not date_string.present?
    # puts "'The date_string: ' :#{date_string}"
    # month/day/year
    
    begin 
      date_array = date_string.split('/').map{|x| x.to_i}
     
      
      datetime = DateTime.new( date_array[2], 
                                date_array[0], 
                                date_array[1], 
                                 0, 
                                 0, 
                                 0,
                    Rational( UTC_OFFSET , 24) )
                  
                  
      return datetime.utc
    rescue Exception => e
      return nil 
    end
  end
  
  def update_fail_member_list(array ) 
    filename = "csvout.csv"

    CSV.open(filename, 'w') do |csv|
      array.each do |el| 
        csv <<  el 
      end
    end
  end

  def generate_csv
    begin
      filename = "JobRequestHistory.csv"
      
      counter = 0 
      # non_submitted_counter = 0
      # non_finished_counter = 0 
      CSV.open(filename, 'w') do |csv| 
        csv << ["No","JobCode", "Dispatched At" , "BannerCode", "TotalRevision"  , "Karyawan" ]
        
        Job.joins(:drafts, :job_code, :user).order("id ASC").each do |job|
          counter += 1 
          array = []
          array << counter
          array << job.code
          
          array << format_datetime_friendly(job.dispatched_at  ) 
          
          array << job.job_code.code
          array << ( job.drafts.count - 1 ) 
          array << job.user.name 
          
          # 
          # last_draft = job.drafts.order("id DESC").first
          # 
          # array << format_datetime_friendly( last_draft.submitted_at  )  
          # 
          # if last_draft.submitted_at.nil?
          #   non_submitted_counter +=1 
          # end
          # 
          # if last_draft.finished_at.nil?
          #   non_finished_counter += 1 
          # end
          
          csv << array 
        end
      end
    rescue Exception => e
      puts e
    end
    
    # puts "Total non submitted: #{non_submitted_counter}"
    # puts "Total non finished: #{non_finished_counter}"
  end
  
  def generate_job_code_report_csv
    begin
      filename = "JobCodeReport.csv"
      
      counter = 0 
      non_submitted_counter = 0
      non_finished_counter = 0 
      
      CSV.open(filename, 'w') do |csv| 
        csv << ["No", "WorkCode", "Total Request" ]
        
        JobCode.includes(:jobs).order("id ASC").each do |job_code|
          counter += 1 
          array = []
          array << counter
          array << job_code.code
          array << job_code.jobs.count   
          
          csv << array 
        end
      end
    rescue Exception => e
      puts e
    end
     
  end
  
  def generate_statistics
    total_unfinished = Draft.where(:is_finished =>false).count
    total_unsubmitted = Draft.where(:is_submitted => false).count
  
  
    puts "Total Unfinished: #{total_unfinished}"
    puts "Total Unsubmitted: #{total_unsubmitted}"
  end
end



task :generate_job_report => :environment do
  generate= Report.new
  generate.generate_csv
  generate.generate_job_code_report_csv 
end

task :generate_job_code_report => :environment do
  generate= Report.new 
  generate.generate_job_code_report_csv 
end

task :generate_statistics => :environment do
  generate= Report.new 
  generate.generate_statistics 
end
