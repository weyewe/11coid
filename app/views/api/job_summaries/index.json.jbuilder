
json.success true 
json.total @total
json.job_summaries @objects do |object|
	json.id 								object.id  
 
	
	json.job_code	            object.job.code 
	json.banner_code					object.job.job_code.code
	json.banner_code_description					object.job.job_code.description
	
	json.description					object.description
	
	json.revision_count				object.code 
	
	json.job_dispatched_at   		format_datetime_friendly( object.job.dispatched_at )
	
	json.draft_dispatched_at    format_datetime_friendly(object.dispatched_at)
	json.finished_at            format_datetime_friendly(object.finished_at)
	json.submitted_at           format_datetime_friendly(object.submitted_at)
	json.cleared_at             format_datetime_friendly(object.cleared_at )
	
	
	
 
end




