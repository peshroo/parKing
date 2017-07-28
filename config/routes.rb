Rails.application.routes.draw do

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'home#index'
  get 'edit_user_form' => 'users#edit_user_form'
  get 'listing_search_form' => 'listings#listing_search_form'
  get 'listing_search' => 'listings#search'
  get 'show_user_bookings' => 'users#show_bookings'
  get 'show_user_listings' => 'users#show_listings'
  get 'user_bookings' => 'users#user_bookings'
  get 'user_listings' => 'users#user_listings'
  get 'review_form' => 'users#review_form'
  get 'edit_review_form' => 'users#edit_review_form'
  get 'listing_markers' => 'listings#markers'

  resource :reviews, only: [:new, :create, :update, :edit, :destroy]
  resources :home
  resources :users
  resource :sessions, only: [:new, :create, :destroy]
  resources :listings do
    resources :bookings
    patch 'toggle'
  end
  resources :conversations do
    resources :messages
  end

  get "/:page" => "pages#show"

end
