class CreateMessagesTableAgain < ActiveRecord::Migration[5.1]
  def change
    create_table :messages do |t|
      t.text :body
      t.references :conversation, index: true
      t.references :user, index: true
      t.boolean :read, :default => false

      t.timestamps
    end
  end
end
