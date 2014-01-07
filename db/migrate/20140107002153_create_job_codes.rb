class CreateJobCodes < ActiveRecord::Migration
  def change
    create_table :job_codes do |t|
      
      t.string :code
      t.text :description 

      t.timestamps
    end
  end
end
