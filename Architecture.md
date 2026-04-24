# System Architecture
- The platform follows a modern MERN architecture with a decoupled Frontend and Backend.

1. Architecture & System Design
- System Layout: Designing a decoupled architecture (Frontend, Backend, Database) to allow independent scaling.

- Database Schema: Designing the MongoDB collections for Products (handling polymorphic Tech/Fashion attributes), Users, Orders and Carts.

- Security Architecture: Planning JWT based authentication, Role Based Access Control, and CORS configurations.

- Integration Planning: Having a simple payment gateway integration.

2. Design & User Experience (UX)
- Component Architecture: Designing a library of reusable UI components using the Stormy Morning palette.

- Responsive Strategy: Establishing a "Mobile First" approach with specific breakpoints for web and tablet views.

- State Management Design: Choosing between Redux Toolkit, Context API, or Zustand for global state (Cart, Auth).

- Performance Optimization: Planning for image lazy loading, code splitting, and CDN integration for media.

3. Documentation
- README & Setup: Creating a clear guide for local development, environment variables, and dependency installation.

- API Documentation

- Database Dictionary

- CI/CD Workflow

- Coding Standards

4. Implementation (Code)
- Backend Scaffolding: Initializing Node/Express with middleware for logging, error handling, and security.

- Frontend Core: Building the layout engine (Hero sections, Nav, Footer) and the routing system (React Router).

Feature Modules:
- Catalog Service
- Cart & Checkout
- User Dashboard: Implementing the visual stepper for order tracking.
- Testing Suite

5. Deployment
- Final Step is to make sure everything works when it is deployed.

##  Frontend Architecture
- The frontend is built for speed and a premium user experience using a component based architecture.

### Tech Stack
- **Framework**: React 18+ (Vite)
- **Styling**: Tailwind CSS (Utility first with a custom "Stormy Morning" theme)
- **Icons**: Lucide React
- **Routing**: React Router Dom
- **State Management**: Zustand (Lightweight, hook-based state)

## Component Hierarchy 
![alt text](<Component Hierarchy.png>)

## Backend Architecture
- The backend is a RESTful API designed with the Controller Service Repository pattern in mind.

### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Security**: JWT (JSON Web Tokens), Bcrypt for hashing.

### Request Lifecycle
1. **Request**: Incoming HTTP request from the React client.
2. **Middleware**: JWT authentication and error handling.
3. **Router**: Routes the request to the specific Controller.
4. **Controller**: Handles the logic and interacts with the Mongoose Models.
5. **Response**: Returns a structured JSON response to the client.


## State Management (Zustand)
- We use Zustand for global state and ensure a reactive UI.

- **`authStore`**: Manages user session, login status, and profile info.
- **`cartStore`**: Handles local cart persistence, adding/removing items, and totals.

## API Design Principles
- **Pragmatic REST**: Using standard HTTP verbs (GET, POST, PUT, DELETE).
- **JSON Standard**: All requests and responses use JSON.
- **Error Handling**: Consistent error objects with status codes and descriptive messages.