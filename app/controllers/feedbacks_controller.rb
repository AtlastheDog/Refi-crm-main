class FeedbacksController < ApplicationController
  def new
    @lead = Lead.find(params[:lead_id])
    @feedback = @lead.feedbacks.new
  end

  def create
    @lead = Lead.find(params[:lead_id])
    @feedback = @lead.feedbacks.new(feedback_params)
    @feedback.user = current_user

    if @feedback.save
      redirect_to @lead, notice: 'Feedback was successfully created.'
    else
      render :new
    end
  end

  private

  def feedback_params
    params.require(:feedback).permit(:feedback, :satisfied_rate, :satisfied_points, :comments)
  end
end
