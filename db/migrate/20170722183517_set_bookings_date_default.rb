class SetBookingsDateDefault < ActiveRecord::Migration[5.1]
  def change
    change_column :bookings, :date, :date, default: Date.today
  end
end
