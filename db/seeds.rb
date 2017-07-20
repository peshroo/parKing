require 'faker'
Booking.destroy_all
Listing.destroy_all
User.destroy_all
Review.destroy_all


5.times do
  User.create!(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  email: Faker::Internet.free_email,
  password: 'password',
  password_confirmation: 'password'
  )
end
10.times do
  listing = Listing.create!(
              name: Faker::App.name,
              location: Faker::App.name,
              description: Faker::Lorem.paragraph,
              price: rand(10),
              start: Time.now + rand(10000),
            end: Time.now + rand(10000)
            )


  5.times do
    listing.bookings.create!(
      user_id:  User.all.sample.id,
      listing_id: Listing.all.sample.id ,
      date: Time.now + rand(10000000),
      time: Time.now + rand(10000000)
    )
  end
end


20.times do
  listing = Listing.all.sample

  Review.create!(
    user_id: User.all.sample.id,
    listing_id: Listing.all.sample.id,
    rating: rand(10),
    comment: Faker::Lorem.paragraph
    


  )
end
