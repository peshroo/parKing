class AddImageAsAttachmentBack < ActiveRecord::Migration[5.1]
  def change
    add_attachment :listings, :image
  end
end
