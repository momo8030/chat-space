FactoryBot.define do
  factory :user do
    password = Faker::Internet.password(min_length: 8)
    name {Faker::Internet.free_email}
    email {Faker::Internet.free_email}
    password {password}
    password_confirmation {password}
  end
end
