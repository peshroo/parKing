class User < ApplicationRecord
  has_secure_password

  has_many :listings
  has_many :bookings
  has_many :reviews
  has_many :ratings
  has_many :messages

end
