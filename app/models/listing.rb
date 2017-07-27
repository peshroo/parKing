class Listing < ApplicationRecord

  validates :name, :address, :description, :price, presence: true
  validates :start, :end, numericality: true

  belongs_to  :user
  has_many    :bookings

  has_many    :reviews

  has_attached_file :image, styles: { large: "600x600>", medium: "300x300>", thumb: "150x150#" }
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/

  def to_hours
    "#{start.hour}:00"
  end

  def operating_hours
    "From #{self.start}:00 to #{self.end}:00"
  end

  def human_time_start
    if  start == 12
      return "#{start} PM"
    elsif start == 0
      return "12 AM"
    elsif start < 12
      return "#{start} AM"
    else
      return "#{start - 12} PM"
    end
  end
  def human_time_end
    if self.end == 12
      return "#{self.end} PM"
    elsif self.end == 0
      return "12 AM"
    elsif self.end < 12
      return "#{self.end} AM"
    else
      return "#{self.end - 12} PM"
    end
  end
end
