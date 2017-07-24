class AddCoordsToListingsForMap < ActiveRecord::Migration[5.1]
  def change
    add_column :listings, :latitude, :float
    add_column :listings, :longitude, :float
  end
end
