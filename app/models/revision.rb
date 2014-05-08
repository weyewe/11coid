class Revision < ActiveRecord::Base
  belongs_to :user
  belongs_to :story_board
end
