class CreateRestaurantRatings < ActiveRecord::Migration[5.1]
  def change
    create_table :restaurant_ratings do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :restaurant, foreign_key: true
      t.integer :rating

      t.timestamps
    end
  end
end
