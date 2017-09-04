class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session[:user_id] = @user.id
      flash[:notice] = 'Account Succefully created'
      redirect_to home_index_path
    else
      flash.now[:error] = 'Something went wrong, Please try Again'
      render :new
    end
  end


  private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :phone, :address, :password, :password_confirmation)
  end


end
