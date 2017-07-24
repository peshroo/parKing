class RemoveImageStringFromListingsTable < ActiveRecord::Migration[5.1]
  def change
    remove_column :listings, :image, :string
  end
end
