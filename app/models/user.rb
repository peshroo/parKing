class User < ApplicationRecord
  has_secure_password

  has_many :listings
  has_many :bookings
  has_many :reviews
  has_many :ratings
  has_many :messages

  def full_name
    "#{first_name} #{last_name}"
  end
end
