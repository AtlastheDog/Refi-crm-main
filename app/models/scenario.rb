class Scenario < ApplicationRecord
  belongs_to :lead

  validates :actual_interest_rate, presence: true, numericality: true
  validates :points, numericality: true, allow_nil: true
end
