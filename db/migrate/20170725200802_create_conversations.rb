class CreateConversations < ActiveRecord::Migration[5.1]
  def change
    add_column :conversations, :hi, :string
    remove_column :conversations, :hi, :string
  end
end
