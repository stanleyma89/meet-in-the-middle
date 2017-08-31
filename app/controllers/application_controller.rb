class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_user
      @current_user ||= User.find(session[:id]) if session[:id]
    end
    helper_method :current_user
  end


  def authenticate
    unless current_user
     flash[:alert] = ["MUST be logged in!"]
     redirect_to root_path
   
  end

end
