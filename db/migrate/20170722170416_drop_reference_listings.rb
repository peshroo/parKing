class DropReferenceListings < ActiveRecord::Migration[5.1]
  def change
    remove_reference :listings, :users, foreign_key: true
  end
end
