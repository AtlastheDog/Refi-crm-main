class ScenariosController < ApplicationController
  before_action :set_scenario, only: [:show, :edit, :update, :destroy]

  def index
    @scenarios = Scenario.all
  end

  def show
  end

  def new
    @scenario = Scenario.new
  end

  def create
    @scenario = Scenario.new(scenario_params)
    if @scenario.save
      redirect_to @scenario, notice: 'Scenario was successfully created.'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @scenario.update(scenario_params)
      redirect_to @scenario, notice: 'Scenario was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @scenario.destroy
    redirect_to scenarios_url, notice: 'Scenario was successfully destroyed.'
  end

  private

  def set_scenario
    @scenario = Scenario.find(params[:id])
  end

  def scenario_params
    params.require(:scenario).permit(:lead_id, :actual_interest_rate, :fico_score_group, :loan_type_group, :property_type_group, :property_value_group, :loan_value_group, :loan_purpose_group, :state, :occupancy, :actual_cost, :points, :rate_sheet_date)
  end
end
