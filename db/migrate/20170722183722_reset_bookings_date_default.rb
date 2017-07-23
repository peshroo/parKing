class ResetBookingsDateDefault < ActiveRecord::Migration[5.1]
  def change
    change_column :bookings, :date, :date
  end
end
