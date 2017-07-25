class AddToggleToListings < ActiveRecord::Migration[5.1]
  def change
    add_column :listings, :status, :boolean, default: true
  end
end
