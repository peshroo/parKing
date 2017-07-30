class ReviewsController < ApplicationController


    def new
      @review = Review.new
    end

    def create
      @review = Review.new(review_params)

      @review.user_id = current_user.id

      if @review.save
        wallet = @review.user.wallet + 0.10
        @review.user.update(wallet: wallet)
        redirect_to user_bookings_path
      else
        redirect_to root_url
      end
    end

    def edit
      @review = Review.find(params[:id])
    end

    def update
      @review = Review.find(params[:review][:id])
      #
      if @review.update(review_params)
        redirect_to user_bookings_path
      else
        flash.now[:error] = 'Sorry try again'
        render :edit

      end
    end

    def destroy
      @review = Review.find(params[:review_id])
      @review.destroy
      flash[:alert] = "Review deleted!"
      redirect_to user_bookings_path
    end
    def review_form
      respond_to do |format|
        format.js
      end
    end
    private

    # def load_listing
    #   @review = Review.find(params[:listing_id])
    # end

    def review_params
      params.require(:review).permit(:rating, :comment, :listing_id, :user_id)
    end
  end
