class ChangeBookingsTimeIntegerToTime < ActiveRecord::Migration[5.1]
  def change
    change_column :bookings, :time, :time
  end
end
