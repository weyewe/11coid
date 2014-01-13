
json.success true 
json.total @total
json.drafts @objects do |object|
	json.id 								object.id  
 
	
	json.job_id					 object.job.id
	json.job_code			 object.job.code
	json.user_name 				object.user.name 
	json.user_id			 object.user.id
	
	json.description object.description 
end


 