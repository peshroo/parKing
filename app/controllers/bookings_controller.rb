class BookingsController < ApplicationController

    before_action :listing?, only: [:new, :create, :edit, :update, :destroy]
    before_action :booking?, only: [:show, :edit, :update, :destroy]

    def index
      @booking = Booking.all
    end

    def show
    end

    def new
      @booking = Booking.new
    end

    def create
      @booking = Booking.new(booking_params)
      @booking.user_id = session[:user_id]
      @booking.listing_id = @listing.id

      if @booking.save
        flash[:notice] = "Your booking has been successfully created!"
        redirect_to user_bookings_path
      else
        flash[:alert] = "Something went wrong!"
        render :new
      end
    end

    def edit
    end

    def update
      if @booking.update(booking_params)
        flash[:notice] = "Your booking has been successfully updated!"
        redirect_to users_path
      else
        render :edit
      end
    end

    def destroy
      @booking.destroy
      flash[:notice] = "Your booking has been successfully cancelled!"
      redirect_to user_bookings_path
    end

    def booking_params
      params.require(:booking).permit(:date, :time)
    end

    def listing?
      @listing = Listing.find(params[:listing_id])
    end

    def booking?
      @booking = Booking.find(params[:id])
    end
  end
