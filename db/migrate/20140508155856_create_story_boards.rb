class CreateStoryBoards < ActiveRecord::Migration
  def change
    create_table :story_boards do |t|
      t.integer :artwork_count , :default => 0
      t.integer :status, :default => STORY_BOARD_STATUS[:banner]
      
      
      # filled in during dispatch, can be updated 
      t.datetime :dispatched_at
      t.datetime :due_date
      t.text :brief
      t.integer :user_id   # who is responsible for doing this story board
      
      
      t.datetime :submitted_at 
      t.boolean :is_submitted , :default => false 
      
      t.boolean :is_priority, :default => false 
      t.integer :parent_story_board_id   # only filled in for HTML story board status 
      
      t.boolean :is_deleted, :default => false 
      t.datetime :deleted_at 
      
      

      t.timestamps
    end
  end
end
