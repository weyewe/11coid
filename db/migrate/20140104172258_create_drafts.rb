class CreateDrafts < ActiveRecord::Migration
  def change
    create_table :drafts do |t|
      t.integer :job_id
      # t.integer :category_id 
      
      t.datetime :dispatched_at 
      
      t.text :description
      
      
      t.integer :status # major or minor? REVISION_STATUS
      
      
      
      # means: submitted 
      t.boolean :is_finished, :default => false
      t.datetime :finished_at
      
      # finished artwork won't be submitted to the customer yet. 
      # submit means: giving it to the client's PM
      t.boolean :is_submitted, :default => false
      t.datetime :submitted_at
      
      
      # cleared: result.. if is approved? or rejected? 
      # sometimes, client is fucking slow. If after 1 week, clearance or approval, then
      # we can assume nothing
      
      # but if the result is being published, we can assume that it is approved.
      t.boolean :is_cleared, :default => false
      t.datetime :cleared_at 
      
      t.integer :clearance_status

      t.timestamps
    end
  end
end
