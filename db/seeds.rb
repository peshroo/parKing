require 'faker'
Booking.destroy_all
Listing.destroy_all
User.destroy_all
Review.destroy_all


5.times do
  user =  User.create!(
  first_name: Faker::Name.first_name,
  last_name: Faker::Name.last_name,
  email: Faker::Internet.free_email,
  password: 'password',
  password_confirmation: 'password'
  )
  puts "user #{user.first_name} created"
end

locations = %w(Dundas Yonge Bloor Queen College King Bathurst Spadina Simcoe)

10.times do

  listing = Listing.create!(
  name: Faker::App.name,
  location: locations.sample,
  description: Faker::Lorem.paragraph,
  price: rand(10),
  start: Time.now + rand(10000),
end: Time.now + rand(10000)
)
puts "location #{listing.name}, #{listing.location} created"

5.times do
  booking = listing.bookings.create!(
  user_id:  User.all.sample.id,
  listing_id: Listing.all.sample.id ,
  date: Time.now + rand(10000000),
  start_time: Time.now + rand(10000000),
  end_time: Time.now + rand(10000000)
  )

  puts "bookings starts at #{booking.start_time}, booking ends at #{booking.end_time}."
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
