class ListingsController < ApplicationController

    def index
      @listings = Listing.all
      @listings = if params[:term]
        Listing.where('name LIKE ?', "%#{params[:term]}%")
      else
        Listing.all
      end
    end

    def show
      @listing = Listing.find(params[:id])
    end

    def new
      @listing = Listing.new
    end

    def create
      @listing = Listing.new(listing_params)

      if @listing.save
        flash[:notice] = "Your listing has been successfully created!"
        redirect_to listings_path
      else
        render new_listing_path
        # render :new
      end
    end

    def edit
      @listing = Listing.find(params[:id])
    end

    def update
      @listing = Listing.find(params[:id])
      if @listing.update(listing_params)
        flash[:notice] = "Your listing has been successfully updated!"
        redirect_to @listing
      else
        render :edit
      end
    end

    def destroy
      @listing = Listing.find(params[:id])
      @listing.destroy
      flash[:notice] = "Your listing has been successfully DESTROYED!"
      redirect_to listings_path
    end

    def listing_search_form
    end

    def search
      @listings = Listing.where('name LIKE ?', "%#{params[:name]}%").select { |t| t.start.hour < params[:date][:hour].to_i && t.end.hour > params[:date][:hour].to_i}
      # @listings = Listing.where('name LIKE ? AND start <= ? AND end >= ?', "%#{params[:name]}%", params[:time], params[:time])
    end

private
    def listing_params
      params.require(:listing).permit(:name, :location, :description, :price, :rating, :start, :end, :image, :term)
    end

  end
