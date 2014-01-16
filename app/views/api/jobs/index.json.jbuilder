
json.success true 
json.total @total
json.jobs @objects do |object|
	json.id 								object.id  
 
	
	json.job_code_id	 object.job_code.id
	json.job_code_code object.job_code.code
	json.user_id object.user.id 
	json.user_name object.user.name
	
	json.description object.description
	json.code object.code
	
	json.dispatched_at format_datetime_friendly(object.dispatched_at) 
end




