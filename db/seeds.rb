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

30.times do
  listing_location = locations.sample
  listing = Listing.create!(
    name: Faker::App.name,
    address: "#{rand(1..100)} #{listing_location} Toronto, ON",
    location: listing_location,
    description: Faker::Lorem.paragraph,
    user_id: User.all.sample.id,
    price: rand(1.5..2.5),
    image: "http://lorempixel.com/250/150/nightlife/#{rand(10)}/",
    start: rand(24),
    end: rand(24)
  )
  puts "location #{listing.name}, #{listing.location} created"

  3.times do
    a_listing = Listing.all.sample
    a_user = User.where('id != ?', a_listing.user_id)
    booking = listing.bookings.create!(
    user_id:  User.all.sample.id,
    listing_id:  a_listing.id,
    date: Date.today + rand(-8..0).days,
    start_time: rand(24),
    end_time: rand(24)
  )
  puts "bookings starts at #{booking.start_time}, booking ends at #{booking.end_time}."
  end

  1.times do
    a_listing = Listing.all.sample
    a_user = User.where('id != ?', a_listing.user_id)
    booking = listing.bookings.create!(
    user_id:  User.all.sample.id,
    listing_id:  a_listing.id,
    start_time: rand(24),
    end_time: rand(24)
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
