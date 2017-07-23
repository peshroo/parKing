class Booking < ApplicationRecord

  belongs_to :listing
  belongs_to :user

  # validate :booking_date_not_in_past
  # validate :booking_time_is_during_open_hours

  before_create do
   self.date = Date.today unless self.date
 end

  def booking_time_is_during_open_hours
    if time.present? && time >= self.listing.start && time <= self.listing.end
    else
      errors.add(:time, "Sorry, the parking spot is unavailable at this time, please choose another.")
    end
  end

  def booking_date_not_in_past
    if date.present? && self.date > Date.today
    else
      errors.add(:date, "Can't be in the past.")
    end
  end

  def human_time
    if  start_time == 12
      return "#{start_time} PM"
    elsif start_time == 0
      return "12 AM"
    elsif start_time < 12
      return "#{start_time} AM"
    else
      return "#{start_time - 12} PM"
    end
  end

end
