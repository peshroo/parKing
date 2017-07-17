class UsersController < ApplicationController

  def index

  end

  def new
    @user = User.new
  end

  def show
    @user = User.find(session[:user_id])
  end

  def create
    @user = User.new(user_params)

    if @user.save
      flash[:notice] = 'Account successfully created!'
      session[:user_id] = @user.id
      redirect_to root_url
    else
      flash.now[:error] = 'Sorry, try again!'
      render :new
    end
  end

  def edit
    unless @user
      flash[:error] = "Must be logged in"
      redirect_to root_url and return
    end
  end

  def update
    unless @user
      flash[:error] = "Must be logged in"
      redirect_to root_url and return
    end

    @user.assign_attributes(user_params)

    if @user.save
      flash[:notice] = 'Account successfully updated!'
      redirect_to edit_users_path
    else
      flash.now[:error] = 'Sorry, try again!'
      render :edit
    end
  end

  def destroy
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

end
