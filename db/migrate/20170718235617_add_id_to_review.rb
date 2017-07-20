class AddIdToReview < ActiveRecord::Migration[5.1]
  def change

    add_reference :reviews, :listing, foreign_key: true
    add_reference :reviews, :user, foreign_key: true
    add_column :reviews, :rating, :integer
    add_column :reviews, :comment, :text
    drop_table :ratings
  end
end
