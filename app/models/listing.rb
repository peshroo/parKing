class Listing < ApplicationRecord

  validates :name, :address, :description, :price, presence: true
  validates :start, :end, numericality: true

  belongs_to  :user
  has_many    :bookings

  has_many    :reviews


  has_attached_file :image, styles: { large: "600x600>", medium: "300x300>", thumb: "150x150#" }, default_url: "no_parking_:style.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\z/


  def am_pm(hour)
    meridian = (hour >= 12) ? 'PM' : 'AM'
    hour = case hour
          when 0, 12
            12
          when 13 .. 23
            hour - 12
          else
            hour
          end
    "#{ hour }#{ meridian }"
  end

  def operating_hours
    "From #{self.start}:00 to #{self.end}:00"
  end

  def human_time_start
    meridian = (start >= 12) ? 'pm' : 'am'
    hour = start
      case start
      when 0, 12 then hour = 12
       when 13 .. 23 then hour -= 12
       else
        hour
    end
    "#{hour} #{meridian}"
  end
  def human_time_end
    meridian = (self.end >= 12) ? 'pm' : 'am'
    hour = self.end
      case self.end
      when 0, 12 then hour = 12
      when 13 .. 23 then hour -= 12
       else
        hour
    end
    "#{hour} #{meridian}"
  end
  def available_hours
    if start < self.end
      times = (start...self.end).to_a
    else
      times = (start...24).to_a
      times.concat((0..self.end).to_a)
    end
    print "times before: #{times}"
    bookings.where(date: Date.today).each do |booking|
      booking_times = (booking.start_time..booking.end_time).to_a
      booking_times.each do |booking_time|
        times.delete(booking_time)
      end
      print "booking times: #{booking_times}"
    end
    print "times after: #{times}"
    times.length > 1 ? "#{am_pm(times[0])} - #{am_pm(times[-1])}" : false
  end
end
