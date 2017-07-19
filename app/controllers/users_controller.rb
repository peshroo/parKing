class UsersController < ApplicationController

  before_action :find_user, only: [:edit, :update, :edit_user_form, :show_bookings]

  def index

  end

  def new
    @user = User.new
  end

  def show
    @user = User.find(session[:user_id])
    @bookings = @user.bookings
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
      # default behaviour of flash works on a redirect
      flash[:notice] = 'Account successfully updated!'
      redirect_to user_path(@user)
    else
      # flash.now works on the same request
      flash.now[:error] = 'Sorry, try again!'
      render :edit
    end
  end


  def edit_user_form
    respond_to do |format|
      format.js
    end
  end

  def show_bookings
    @bookings = @user.bookings
    respond_to do |format|
      format.js
    end
  end

  def destroy
    @user = User.find(session[:user_id])
    @user.destroy
    session[:user_id] = nil
    redirect_to root_url
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

  def find_user
    @user = current_user
  end

end
