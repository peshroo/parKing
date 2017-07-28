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
      if @listing.start < @listing.end
        times = (@listing.start...@listing.end).to_a
        @array_of_times = times.map do |hours|
          meridian = (hours >= 12) ? 'pm' : 'am'
          hour = hours
            case hours
            when 0, 12 then hour = 12
            when 13 .. 23 then hour -= 12
             else
              hour
          end
          ["#{hour} #{meridian}", hours]
        end
      else
        times = (@listing.start...24).to_a
        times.concat((0...@listing.end).to_a)
        @array_of_times = times.map do |hours|
          meridian = (hours >= 12) ? 'pm' : 'am'
          hour = hours
            case hours
            when 0, 12 then hour = 12
             when 13 .. 23 then hour -= 12
             else
              hour
          end
          ["#{hour} #{meridian}", hours]
        end
      end
      # @listing.bookings.each do |booking|
      #   single_booking_array = (booking.start_time..booking.end_time).to_a
      #   single_booking_array_mapped = single_booking_array.map do |hours|
      #     meridian = (hours >= 12) ? 'pm' : 'am'
      #     hour = hours
      #       case hours
      #       when 0, 12 then hour = 12
      #        when 13 .. 23 then hour -= 12
      #        else
      #         hour
      #     end
      #     ["#{hour} #{meridian}", hours]
      #   end
      #   single_booking_array_mapped.each do |single_booking_hour|
      #     @array_of_times.slice!(single_booking_array.index(single_booking_hour))
      #   end
      # end
      @array_of_times
    end

    def create
      @booking = Booking.new(booking_params)
      @booking.user_id = session[:user_id]
      @booking.listing_id = @listing.id

      if @booking.save
        @booking.listing.update(status: false) if @booking.listing.available_hours == false
        flash[:notice] = "Your booking has been successfully created!"
        redirect_to user_bookings_path
      else
        flash[:alert] = "Something went wrong!"
        # redirect_to listing_path(@listing.id)
        render 'listings/show', :params => {id: @listing.id}
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
      params.require(:booking).permit(:date, :start_time, :end_time)
    end

    def listing?
      @listing = Listing.find(params[:listing_id])
    end

    def booking?
      @booking = Booking.find(params[:id])
    end
  end
