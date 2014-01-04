class CreateDrafts < ActiveRecord::Migration
  def change
    create_table :drafts do |t|
      t.integer :job_id
      t.integer :user_id 
      t.integer :category_id 
      
      t.datetime :dispatched_at 
      
      t.text :description
      
      
      t.integer :status # major or minor? REVISION_STATUS
      
      
      
      # means: submitted 
      t.boolean :is_finished, :default => false
      t.datetime :finished_at
      
      t.boolean :is_cleared, :default => false
      t.datetime :cleared_at 
      
      t.integer :clearance_status

      t.timestamps
    end
  end
end
