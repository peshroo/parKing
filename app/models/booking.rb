class Booking < ApplicationRecord

  belongs_to :listing
  belongs_to :user

  # validate :booking_start_time_is_during_open_hours
  # validate :booking_end_time_is_during_open_hours


  before_create do
   self.date = Date.today unless self.date
 end

  def booking_start_time_is_during_open_hours
    if start_time.present? && start_time >= self.listing.start && start_time < self.listing.end
    else
      errors.add(:start_time, "is not within available hours")
    end
  end
  def booking_end_time_is_during_open_hours
    if end_time.present? && end_time > self.listing.start && end_time < self.listing.end
    else
      errors.add(:end_time, "is not within available hours")
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
