class RestaurantRating < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant
  validates_presence_of :rating
  validates_numericality_of :rating
  validates_inclusion_of :rating, in: [0, 1], message: 'Rating Must Be 0 or 1'
end
