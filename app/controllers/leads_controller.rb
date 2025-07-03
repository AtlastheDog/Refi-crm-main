class LeadsController < ApplicationController
  before_action :set_lead, only: [:show, :edit, :update, :destroy]

  def index
    @leads = Lead.all
  end

  def show
  end

  def new
    @lead = Lead.new
  end

  def create
    @lead = Lead.new(lead_params)
    if @lead.save
      redirect_to @lead, notice: 'Lead was successfully created.'
    else
      render :new
    end
  end

  def edit
  end

  def update
    if @lead.update(lead_params)
      redirect_to @lead, notice: 'Lead was successfully updated.'
    else
      render :edit
    end
  end

  def destroy
    @lead.destroy
    redirect_to leads_url, notice: 'Lead was successfully destroyed.'
  end

  def analyze
    # Custom logic for analyzing leads
  end

  private

  def set_lead
    @lead = Lead.find(params[:id])
  end

  def lead_params
    params.require(:lead).permit(:first_name, :last_name, :phone_number, :email, :fico_score, :loan_type, :property_value, :loan_value, :loan_purpose, :state, :occupancy, :interest_level, :notes, :minimum_rate_needed, :maximum_points_needed, :user_id, :property_type)
  end
end
