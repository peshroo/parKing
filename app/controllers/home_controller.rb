class HomeController < ApplicationController

  def index
    @user = User.new
    @current_user = current_user
  end

  def create
    @user = User.new(user_params)

    if @user.save
      # default behaviour of flash works on a redirect
      flash[:notice] = 'Account successfully created!'
      session[:user_id] = @user.id
      redirect_to root_url
    else
      # flash.now works on the same request
      flash.now[:error] = 'Sorry, try again!'
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end
end
