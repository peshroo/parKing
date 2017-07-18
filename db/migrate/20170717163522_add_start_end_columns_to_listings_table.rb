class AddStartEndColumnsToListingsTable < ActiveRecord::Migration[5.1]
  def change
    add_column :listings, :start, :time
    add_column :listings, :end, :time
  end
end
