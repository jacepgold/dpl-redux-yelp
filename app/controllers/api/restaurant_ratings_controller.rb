class Api::RestaurantRatingsController < ApplicationController
  def update
    # if we have params[:id] - which comes from the query string we want to update that rating
    # if we dont have params[:id] we want to create a new rating for the current_user
    rating = RestaurantRating.where(id: params[:id]).first_or_initialize do |restaurant_rating|
      restaurant_rating.attributes = restaurant_rating_params
    end

    # figure out if the rating is a new one in the database or not and if it isn't we update just the rating
    # allow us only to like or dislike a restaurant not both
    # if rating.persisted?
    #   rating.update(restaurant_rating_params)
    # else
    #   rating.save
    # end

    rating.persisted? ? rating.update(restaurant_rating_params) : rating.save
    @restaurants = Restaurant.all
    render 'api/restaurants/index'
  end

  private
    def restaurant_rating_params
      params.require(:restaurant_rating).permit(:user_id, :restaurant_id, :rating)
    end
end