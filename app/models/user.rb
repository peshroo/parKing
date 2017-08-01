class User < ApplicationRecord
  has_secure_password

  has_many :listings
  has_many :bookings
  has_many :reviews
  has_many :ratings
  has_many :messages

  has_attached_file :avatar, styles: { large: "600x600>", medium: "300x300>", thumb: "25x25#" }, default_url: "white_crown_:style.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/

  before_create do
    self.wallet = 5.00
  end

  def full_name
    "#{first_name} #{last_name}"
  end
end
