Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get 'login' => 'sessions#new', :as => :login
  get 'logout' => 'sessions#destroy', :as => :logout

  root 'home#index'

  resources :home, only: [:index]
  resources :map
  resources :users, only: [:new, :create]
  resources :sessions, only: [:create, :destroy]

end
