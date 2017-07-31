class CheckImageIsAttachment < ActiveRecord::Migration[5.1]
  def up
    remove_attachment :listings, :image
    end
  end

  def down
    change_table :listings do |t|
      t.attachment :image
  end
end
