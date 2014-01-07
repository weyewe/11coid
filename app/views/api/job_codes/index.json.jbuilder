
json.success true 
json.total @total
json.job_codes @objects do |object|
	json.id 								object.id  
 
	
	json.code object.code
	json.description object.description
	json.total_job object.jobs.count 
end




