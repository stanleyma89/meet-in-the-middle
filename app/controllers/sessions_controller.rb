class SessionsController < ApplicationController
  def new
  end

  def create
    @user = User.find_by(email: params[:email])

    if @user && @user.authenticate(params[:password])

      session[:user_id] = @user.id

      flash[:notice] = ' Successful! You are logged in! '
      redirect_to home_index_url

    else
      flash.now[:alert] = ' Try again!'
      render :new
    end
  end

  def destroy
    session[:user_id] = nil

    flash[:notice] = "You're logged out"
    redirect_to home_index_url
    end
end
