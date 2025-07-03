class RatePoint < ApplicationRecord
  belongs_to :scenario

  validates :rate, presence: true, numericality: true
  validates :points, presence: true, numericality: true
end
