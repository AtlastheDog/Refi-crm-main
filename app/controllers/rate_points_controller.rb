class RatePointsController < ApplicationController
  def index
    @rate_points = RatePoint.all
  end

  def show
    @rate_point = RatePoint.find(params[:id])
  end

  def new
    @rate_point = RatePoint.new
  end

  def create
    @rate_point = RatePoint.new(rate_point_params)
    if @rate_point.save
      redirect_to @rate_point, notice: 'Rate point was successfully created.'
    else
      render :new
    end
  end

  private

  def rate_point_params
    params.require(:rate_point).permit(:scenario_id, :rate, :points)
  end
end
