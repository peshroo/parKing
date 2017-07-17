class AddColumnsToBookingsTable < ActiveRecord::Migration[5.1]
  def change
    add_column :bookings, :user_id, :integer
    add_column :bookings, :listing_id, :integer
    add_column :bookings, :date, :date
    add_column :bookings, :time, :integer
  end
end
