class SessionsController < ApplicationController
  def new
  end

  def create
    u = User.find_by(email: params[:sessions][:email])

    if u && u.authenticate(params[:sessions][:password])

      # Send a cookie to user's browser
      session[:user_id] = u.id

      redirect_to root_url
    else
      flash.now[:alert] = 'Incorrect email or password.'
      render :new
    end

  end

  def destroy
    # Clear the session cookie
    session[:user_id] = nil

    flash[:notice] = "You're logged out!"
    redirect_to root_url
  end
end
