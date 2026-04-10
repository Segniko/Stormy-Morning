# Stormy Morning - Fashion & Gadget E-Commerce

A modern MERN stack e commerce platform featuring Fashion and Tech products.

## Design System
- **Theme**: Stormy Morning
- **Pallete**: 
  - Primary: `#384959`
  - Accents: `#6A89A7`, `#BDDDFC`, `#88BDF2`
- **UI Framework**: Tailwind CSS
- **Icons**: Lucide React / Custom SVG

## Tech Stack
- **Frontend**: Vite, React, Tailwind CSS, Zustand
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Security**: Bcrypt, HTTP-only Cookies
- **Media**: Local Disk Storage

## Project Structure
```text
├── client/          # Vite + React Frontend
├── server/          # Node.js + Express Backend
├── DOCS/            # Architectural & API Documentation
└── README.md        # This file
```

## Setup Instructions

### Prerequisites
- [Node.js](https://nodejs.org/) (v22+)
- [MongoDB](https://www.mongodb.com/try/download/community) (Local or Atlas)

### 1. Database & Server Setup
```bash
cd server
npm install
cp .env
npm run dev
```

### 2. Frontend Setup
```bash
cd client
npm install
npm run dev
```

## Documentation
- [Database Dictionary](./DOCS/DATABASE.md)
- [API Specification](./DOCS/API_PLAN.md)
- [Coding Standards](./DOCS/STANDARDS.md)
