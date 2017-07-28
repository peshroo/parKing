class CreateListings < ActiveRecord::Migration[5.1]
  def change
    create_table :listings do |t|
      t.string :name
      t.string :address
      t.float :latitude
      t.float :longitude
      t.text :description
      t.integer :price
      t.integer :start
      t.integer :end
      t.string :image
      t.boolean :status, default: true
      t.references :user
      
      t.timestamps
    end
  end
end
