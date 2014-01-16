
json.success true 
json.total @total
json.drafts @objects do |object|
	json.id 								object.id  
 
	
	json.job_id					 object.job.id
	json.job_code			 object.job.code
	
	json.code			 object.code
 
	
	json.description object.description 
	
	json.dispatched_at 			format_datetime_friendly(object.dispatched_at) 
	json.finished_at 				format_datetime_friendly(object.finished_at) 
	json.submitted_at 			format_datetime_friendly(object.submitted_at) 
	json.cleared_at 		format_datetime_friendly(object.cleared_at) 
	
	json.clearance_status  object.clearance_status
	json.clearance_status_text object.clearance_status_text  
	 
	
	
end


 