class FixingListingsBookings < ActiveRecord::Migration[5.1]
  def change
    remove_column :bookings, :date, :date
    change_column :bookings, :start_time, :integer
    change_column :bookings, :end_time, :integer
    change_column :listings, :start, :integer
    change_column :listings, :end, :integer
  end
end
