class LoanCondition < ApplicationRecord
  belongs_to :user

  validates :interest_rate, presence: true, numericality: true
end
