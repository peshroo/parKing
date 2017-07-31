class CheckImageIsAttachment < ActiveRecord::Migration[5.1]
  def change
    change_column :listings, :image, :attachment
  end
end
