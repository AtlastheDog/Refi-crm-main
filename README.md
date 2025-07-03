# Refi CRM

Refi CRM is a Rails + React full-stack application designed to identify borrowers able to refinance based on custom rate sheets

## Features

- 📸 OCR image upload to parse rate sheets
- 📊 Lead-to-scenario matching based on dynamic rate inputs
- 📝 Feedback collection on matched leads
- 🔐 Devise authentication with JWT support
- 🌐 RESTful API endpoints for lead management
- 🗂️ Admin dashboard for scenario insights and history

  ## ⚙️ Tech Stack

- **Frontend**: React (Next.js App Router), TypeScript, TailwindCSS
- **Backend**: Rails API with ActiveStorage, Devise, and PostgreSQL
- **OCR**: OCR.Space API integration
- **Authentication**: JWT via Devise Token Auth
- **State Management**: React Context

---

## Local Setup

### Requirements

- Ruby 3.4.1
- Rails 8.0.2
- PostgreSQL (e.g., Postgres 16+)
- Node.js + Yarn (for frontend, if running both)

### 1. Clone the Repos 

```bash
git clone https://github.com/AtlastheDog/refi-crm.git
git clone https://github.com/AtlastheDog/Refi-crm-FE.git

### 2. Setup Backend (Rails)
cd refi-crm
bundle install
rails db:setup

### 3. Setup Frontend (Next.js/React)
cd Refi-crm-FE
yarn install
yarn dev

---

## OCR Integration

This project uses OCR.space to parse rate sheet images.

### Add Your API Key

### 1. Open Credentials Editor
EDITOR="nano" bin/rails credentials:edit

### 2. Add
ocr_space:
  api_key: YOUR_API_KEY_HERE

## Contributing
Feel free to open issues or submit PRs! This project is early-stage and being actively developed.

## License
MIT
