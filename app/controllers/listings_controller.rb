class ListingsController < ApplicationController

    def index

      if params[:term]
        @listings =  Listing.where('name LIKE ?', "%#{params[:term]}%")
      else
        @listings =  Listing.all
      end
    end

    def show
      @listing = Listing.find(params[:id])
      # Listing.all.sample.bookings.where('date = ?', Date.today)
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
      @array_of_times
    end

    def new
      @listing = Listing.new
      full_time = (0..23).to_a
      @array_of_full_times = full_time.map do |hours|
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

    def create
      @listing = Listing.new(listing_params)
      
      if @listing.save
        wallet = @listing.user.wallet + 0.50
        @listing.user.update(wallet: wallet)
        flash[:notice] = "Your listing has been successfully created!"
        render html: 'OK'
      else
        render new_listing_path
        # render :new
      end
    end

    def edit
      @listing = Listing.find(params[:id])
      full_time = (0..23).to_a
      @array_of_full_times = full_time.map do |hours|
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

    def update
      @listing = Listing.find(params[:id])
      if @listing.update(listing_params)
        flash[:notice] = "Your listing has been successfully updated!"
        # render :index
        if request.xhr?
          render json: 'ok'
        else
          redirect_to user_listings_path
        end
        # redirect_to user_listings_path
        # render 'users/user_listings', anchor: 'edit'
      else
        render :edit
      end
    end

    def destroy
      @listing = Listing.find(params[:id])
      @listing.bookings.destroy_all
      @listing.destroy
      flash[:notice] = "Your listing has been successfully DESTROYED!"
      redirect_to user_listings_path
    end

    def listing_search_form
    end

    def search
      if current_user
        @listings = Listing.all
        # @listings = Listing.where(status: true).where('address LIKE ?', "%#{params[:term]}%").select { |t| t.start <= params[:date][:hour].to_i && t.end >= params[:date][:hour].to_i}
      else
        flash[:notice] = "You must be logged in."
        render '/'
      end
    end

    def markers
      respond_to do |format|
        format.json do
        @listings = Listing.all
        render json: @listings, include: [:reviews, :user]
        end
      end
    end
private
    def listing_params
      params.require(:listing).permit(:user_id, :name, :location, :description, :price, :rating, :start, :end, :image, :term, :latitude, :longitude, :address, :status)
    end

  end
