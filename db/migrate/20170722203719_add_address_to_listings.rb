class AddAddressToListings < ActiveRecord::Migration[5.1]
  def change
    add_column :listings, :address, :string
  end
end
