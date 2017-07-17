class AddColumnsToListingsTable < ActiveRecord::Migration[5.1]
  def change
    add_column :listings, :name, :string
    add_column :listings, :location, :string
    add_column :listings, :description, :text
    add_column :listings, :price, :integer
    add_column :listings, :rating, :integer
  end
end
