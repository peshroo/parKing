class AddUserToListing < ActiveRecord::Migration[5.1]
  def change
    add_reference :listings, :user, foreign_key: true
  end
end
