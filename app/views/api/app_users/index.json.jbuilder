
json.success true 
json.total @total
json.users @objects do |object|
	json.id 								object.id  
 
	
	json.job_status					 object.job_status
	json.job_status_text			 object.job_status_text
	
	json.email	object.email
	json.name	object.name
	
	json.role_id object.role_id
	json.role_name object.role.name
	 
	
	
end


