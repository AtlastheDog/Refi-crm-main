Rails.application.routes.draw do
  # Devise routes for user authentication
  devise_for :users, path: 'api/users', controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  # Resources for leads with nested feedbacks
  resources :leads do
    collection do
      get :analyze  # GET /leads/analyze → LeadsController#analyze
    end

    resources :feedbacks, only: [:new, :create]
  end

  # Resources for scenarios
  resources :scenarios

  # Resources for loan conditions
  resources :loan_conditions, only: [:index, :show]

  # Resources for rate points
  resources :rate_points, only: [:index, :show, :new, :create]

  # Resources for images
  resources :images, only: [:create]

  # Display OCR results stored in session
  get 'results', to: 'images#results'

  # Test endpoint for verifying OCR ingestion
  post 'test_ocr', to: 'images#test_ocr'

  # Root path
  root to: 'leads#index'
end
