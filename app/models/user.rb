class User < ApplicationRecord
  has_many :leads, dependent: :destroy
  has_many :feedbacks, dependent: :destroy
  has_many :loan_conditions, dependent: :destroy
end
