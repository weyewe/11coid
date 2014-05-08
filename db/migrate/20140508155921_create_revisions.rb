class CreateRevisions < ActiveRecord::Migration
  def change
    create_table :revisions do |t|
      t.integer :story_board_id 
      
      t.datetime :feedback_given_at 
      t.integer :user_id 
      t.text :brief 
      
      t.datetime :submitted_at 
      t.boolean :is_submitted , :default => false
      
      t.boolean :is_deleted, :default => false
      t.datetime :deleted_at 

      t.timestamps
    end
  end
end
