class RemoveDefaultFromBookingsDate < ActiveRecord::Migration[5.1]
  def change
    remove_column :bookings, :date
    add_column :bookings, :date, :date
  end
end
