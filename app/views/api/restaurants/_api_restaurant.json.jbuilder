json.extract! restaurant, :id, :name, :main_image, :images, :description
json.added_on restaurant.created_at.strftime("%A, %B %uth")
json.likes restaurant.restaurant_ratings.where(rating: 1)
json.dislikes restaurant.restaurant_ratings.where(rating: 0)