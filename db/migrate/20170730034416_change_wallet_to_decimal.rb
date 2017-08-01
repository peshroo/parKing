class ChangeWalletToDecimal < ActiveRecord::Migration[5.1]
  def up
    change_column :users, :wallet, :float
  end

  def down
    change_column :users, :wallet, :decimal, precision: 8, scale: 2
  end
end
