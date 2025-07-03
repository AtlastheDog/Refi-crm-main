class Feedback < ApplicationRecord
  belongs_to :lead
  belongs_to :user

  validates :feedback, presence: true, inclusion: { in: ['thumbs_up', 'thumbs_down'] }
end
