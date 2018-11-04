class Restaurant < ApplicationRecord
  has_many :restaurant_ratings
  has_many :users, through: :restaurant_ratings
end