class ChangeImageDefault < ActiveRecord::Migration[5.1]
  def change
    remove_column :listings, :image, :string, default: "https://k1.midasplayer.com/images/logos/kingLogoRebrand.svg?_v=13wlhey"
    add_column :listings, :image, :string
  end
end
