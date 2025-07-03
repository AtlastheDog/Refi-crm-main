class ApplicationController < ActionController::Base
  # Protect against CSRF attacks
  protect_from_forgery with: :exception

  # Ensure user is authenticated for all actions by default
  before_action :authenticate_user!

  # Set the locale for internationalization
  before_action :set_locale

  # Only allow modern browsers supporting specific features
  allow_browser versions: :modern

  private

  def set_locale
    I18n.locale = params[:locale] || I18n.default_locale
  end

  # Rescue from common exceptions
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

  def record_not_found
    render plain: "404 Not Found", status: 404
  end
end
