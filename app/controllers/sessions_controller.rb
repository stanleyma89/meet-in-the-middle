class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:email])

    if user && user.authenticate(params[:password])

      session[:user_id] = user.id

      flash[:notice] = "Successful! You are now logged in!"
      redirect_to home_index_url

    else
      flash.now[:alert] = "Please try again!"
      render :new
    end
  end

  def destroy
    session[:user_id] = nil

    flash[:notice] = "You're logged out"
    redirect_to front_page_index_path
    end
end
