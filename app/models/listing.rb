class Listing < ApplicationRecord

  validates :name, :location, :description, :price, presence: true
  validates :start, :end, numericality: true

  # belongs_to  :user
  has_many    :bookings
  has_many    :ratings

  def operating_hours
    "From #{self.start}:00 to #{self.end}:00"
  end
end
