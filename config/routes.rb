Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'home#index'
  get 'edit_user_form' => 'users#edit_user_form'

  resources :home
  resources :users
  resource :sessions, only: [:new, :create, :destroy]
end
