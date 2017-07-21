class Listing < ApplicationRecord

  validates :name, :location, :description, :price, presence: true
  validates :start, :end, numericality: true

  # belongs_to  :user
  has_many    :bookings

  has_many    :reviews

  def to_hours
    "#{start.hour}:00"
  end

  def operating_hours
    "From #{self.start}:00 to #{self.end}:00"
  end
end
