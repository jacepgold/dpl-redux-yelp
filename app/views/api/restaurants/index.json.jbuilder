json.restaurants @restaurants do |restaurant|
  json.partial! 'api/restaurants/api_restaurant', restaurant: restaurant
end

json.has_more !@restaurants.last_page?
json.count @restaurants.count