Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'home#index'
  get 'edit_user_form' => 'users#edit_user_form'
  get 'listing_search_form' => 'listings#listing_search_form'
  get 'listing_search' => 'listings#search'
  get 'show_user_bookings' => 'users#show_bookings'
  get 'user_bookings' => 'users#user_bookings'
  get 'review_form' => 'users#review_form'

  resource :reviews, only: [:new, :create, :update, :edit, :destroy]
  resources :home
  resources :users
  resource :sessions, only: [:new, :create, :destroy]
  resources :listings do
    resources :bookings
  end

  get "/:page" => "pages#show"

end
