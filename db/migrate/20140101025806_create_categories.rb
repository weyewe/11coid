class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      
      t.text :description
      t.string :name
      t.integer :expected_clearance_minutes
      
      
      t.timestamps
    end
  end
end
