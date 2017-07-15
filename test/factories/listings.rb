FactoryGirl.define do
  factory :listing do
    street_number '220'
    street_name 'King Street West'
    date_time_from { Time.now.utc + rand(1..4).days }
    date_time_to { Time.now.utc + rand(5..7).days }
    price_per_hour { rand(0.0..5.0) }
    on? true
  end
end
