class ThrowawayMigrationToUpdateSchema < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :hi, :string
    remove_column :users, :hi
  end
end
