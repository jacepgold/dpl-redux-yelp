class Api::RestaurantsController < ApplicationController
  before_action :set_restaurant, only: [:show, :update, :destroy]

  # GET /api/restaurants
  # GET /api/restaurants.json
  def index
    # Eager Loading
    @restaurants = Restaurant.includes(:restaurant_ratings).page(params[:page])
  end

  # GET /api/restaurants/1
  # GET /api/restaurants/1.json
  def show
  end

  # POST /api/restaurants
  # POST /api/restaurants.json
  def create
    @restaurant = Restaurant.new(restaurant_params)

    if @restaurant.save
      render :show, status: :created  
    else
      render json: @restaurant.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /api/restaurants/1
  # PATCH/PUT /api/restaurants/1.json
  def update
    if @restaurant.update(restaurant_params)
      render :show, status: :ok 
    else
      render json: @restauranterrors, status: :unprocessable_entity
    end
  end

  # DELETE /api/restaurants/1
  # DELETE /api/restaurants/1.json
  def destroy
    @restaurant.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_restaurant
      @restaurant = Restaurant.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def restaurant_params
      params.require(:restaurant).permit(:name, :main_image, :images, :description)
    end
end
