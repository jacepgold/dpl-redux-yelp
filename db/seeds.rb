User.destroy_all
Restaurant.destroy_all
RestaurantRating.destroy_all

10.times do |n|
  User.create(
    email: "test_#{n}@test.com", 
    password: 'password',
    name: Faker::FamilyGuy.character,
    nickname: Faker::FamilyGuy.quote,
    image: Faker::LoremPixel.image)
end

100.times do
  Restaurant.create(
    name: Faker::Company.name, 
    description: Faker::Lorem.paragraph, 
    main_image: Faker::Company.logo,
    images: [Faker::Company.logo, Faker::Company.logo, Faker::Company.logo]
  )
end

258.times do
  RestaurantRating.create(
    user_id: User.all.sample.id, 
    restaurant_id: Restaurant.all.sample.id, 
    rating: [0,1].sample
  )
end