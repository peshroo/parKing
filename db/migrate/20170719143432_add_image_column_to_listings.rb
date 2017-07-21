class AddImageColumnToListings < ActiveRecord::Migration[5.1]
  def change
    add_column :listings, :image, :string, default: "https://k1.midasplayer.com/images/logos/kingLogoRebrand.svg?_v=13wlhey"
  end
end
