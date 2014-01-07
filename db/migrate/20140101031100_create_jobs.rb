class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.integer :client_id
      # t.integer :category_id 
      t.integer :user_id 
      
      t.integer :job_code_id 
      
      t.text :description 
       
      t.datetime :dispatched_at 
      
      t.boolean :is_finished, :default => false 
      t.datetime :finished_at 
      
      t.timestamps
    end
  end
end
