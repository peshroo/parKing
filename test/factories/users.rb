FactoryGirl.define do
  factory :user do
    first_name { FFaker::NameMX.male_first_name }
    last_name { FFaker::NameMX.last_name }
    email { FFaker::Internet.disposable_email }
    password 'password'
    password_confirmation 'password'
  end
end
