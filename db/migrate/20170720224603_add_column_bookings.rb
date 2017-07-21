class AddColumnBookings < ActiveRecord::Migration[5.1]
  def change
    add_column :bookings, :start_time, :time
    add_column :bookings, :end_time, :time
    remove_column :bookings, :time

  end
end
