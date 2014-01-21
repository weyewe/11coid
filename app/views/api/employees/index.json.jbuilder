
json.success true 
json.total @total
json.employees @objects do |object|
	json.id 								object.id  
  
	json.email	object.email
	json.name	object.name
	
	
	json.on_progress object.drafts.where(:is_finished => false).count 
	json.pending_submit object.drafts.where(:is_finished => true, :is_submitted => false).count
	json.pending_clearance object.drafts.where(:is_finished => true, :is_submitted => true, :is_cleared => false).count 
end


