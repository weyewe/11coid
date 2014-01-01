class CreateRevisions < ActiveRecord::Migration
  def change
    create_table :revisions do |t|
      t.integer :job_id
      t.integer :user_id 
      t.integer :category_id 
      
      t.datetime :dispatched_at 
      
      t.text :description
      
      
      t.integer :revision_status # major or minor?
      
      
      
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
