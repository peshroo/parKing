class ListingsController < ApplicationController

    def index
      @listings = Listing.all
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

    def listing_params
      params.require(:listing).permit(:name, :location, :description, :price, :rating)
    end

  end
