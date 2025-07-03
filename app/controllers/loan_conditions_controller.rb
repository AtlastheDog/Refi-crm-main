class LoanConditionsController < ApplicationController
  def index
    @loan_conditions = LoanCondition.all
  end

  def show
    @loan_condition = LoanCondition.find(params[:id])
  end
end
