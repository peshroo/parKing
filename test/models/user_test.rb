require 'test_helper'

class UserTest < ActiveSupport::TestCase
  test "user can be created" do
    user = build(:user)
    assert user.valid?
  end
  # test "email must be unique" do
  #   user = create(:user, email: "1@gmail.com")
  #   user2 = build(:user, email: "1@gmail.com")
  #   refute user2.valid?
  # end
  #
  # test "user must include password_confirmation on create" do
  #   user = build(:user, password_confirmation: nil)
  #   refute user.valid?
  # end
  #
  # test "password must match confirmation" do
  #   user = build(:user, password: "drowssap")
  #   refute user.valid?
  # end
  #
  # test "password must be at least 8 characters long" do
  #   user = build(:user, password: "1234", password_confirmation: "1234")
  #   refute user.valid?
  end
end
