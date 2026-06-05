# Stormy Morning E-Commerce Platform - Application Flow

## Tech Stack Overview

### Frontend
- **Framework**: React 18+ with Vite build tool
- **Styling**: Tailwind CSS with custom "Stormy Morning" theme
- **Icons**: Lucide React
- **Routing**: React Router DOM v6
- **State Management**: Zustand (lightweight, hook-based)
- **HTTP Client**: Axios
- **Deployment**: Vercel (configured via vercel.json)

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **Security**: Helmet, CORS, Bcrypt
- **Environment**: dotenv
- **Cookie Handling**: cookie-parser

### Development Tools
- **Version Control**: Git
- **Package Manager**: npm
- **Code Quality**: ESLint
- **Build Tool**: Vite (frontend)
- **API Testing**: Postman 

---

## Architecture Pattern

The application follows several key architectural patterns:

### Frontend
- **Component-Based Architecture**: Reusable UI components
- **Single Page Application (SPA)**: Client-side routing
- **State Management Pattern**: Centralized state with Zustand
- **Container/Presentational Pattern**: Separation of logic and UI

### Backend
- **MVC Pattern**: Model-View-Controller (Model-Route-Controller)
- **RESTful API**: Standard HTTP methods and status codes
- **Middleware Pattern**: Request processing pipeline
- **Repository Pattern**: Database abstraction via Mongoose

### Security
- **JWT Authentication**: Token-based authentication
- **Role-Based Access Control**: Admin vs regular user permissions
- **CORS Configuration**: Controlled cross-origin requests
- **Security Headers**: Helmet for HTTP security headers
- **Password Hashing**: Bcrypt for secure password storage

---

## Frontend Flow

The frontend is built with React 18+ using Vite as the build tool. It follows a component-based architecture with React Router for navigation and Zustand for state management.

### Entry Point: `client/index.html`

The application starts when a user opens the browser and navigates to the frontend URL. The browser loads the HTML file located at:

```
client/index.html
```

This HTML file contains:
- A `<div id="root"></div>` element where React will mount the application
- A script tag that loads `/src/main.jsx` (the React entry point)
- Meta tags for viewport, charset, and favicon
- The page title "Stormy Morning"

### React Entry: `client/src/main.jsx`

Once the HTML is loaded, the browser executes the JavaScript in `client/src/main.jsx`. This file:

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

- Imports React and the ReactDOM createRoot function
- Imports the global CSS file (`index.css`)
- Imports the main `App` component
- Creates a React root and renders the `App` component inside a `StrictMode` wrapper for development checks

### Main Application: `client/src/App.jsx`

The `App.jsx` component is the heart of the frontend application. It:

1. **Sets up React Router** using `BrowserRouter` to handle client-side routing
2. **Renders persistent layout components**:
   - `Navbar` - Navigation bar displayed on all pages
   - `Footer` - Footer displayed on all pages
   - `ScrollToTop` - Ensures scroll position resets on route changes
3. **Defines all application routes**:

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | LandingPage | Home page with hero section, featured products |
| `/products` | ProductListingPage | Browse all products with filters |
| `/product/:id` | ProductDetailPage | View individual product details |
| `/profile` | DashboardPage | User dashboard for order tracking |
| `/@admin-portal` | AdminDashboardPage | Admin panel for managing products/orders |
| `/cart` | CartPage | Shopping cart management |
| `/checkout` | CheckoutPage | Checkout process and payment |
| `/login` | LoginPage | User authentication |
| `/register` | RegisterPage | New user registration |
| `/forgot-password` | ForgotPasswordPage | Password recovery |
| `/about` | AboutPage | Company information |
| `/contact` | ContactPage | Contact form and information |
| `/collections` | CollectionsPage | Product collections/categories |
| `/privacy-policy` | PrivacyPolicyPage | Privacy policy |
| `/terms-of-service` | TermsOfServicePage | Terms of service |
| `/shipping-policy` | ShippingPolicyPage | Shipping information |

### Page Components: `client/src/pages/*.jsx`

Each route renders a specific page component located in the `client/src/pages/` directory. These pages:

- Display content specific to their purpose
- Import and use reusable components from `client/src/components/`
- Manage local component state using React hooks (useState, useEffect, etc.)
- Interact with Zustand stores for global state management
- Make API calls to the backend server using axios
- Handle user interactions (forms, buttons, navigation)

### Reusable Components: `client/src/components/*.jsx`

The `components/` directory contains reusable UI components used across multiple pages:

- **Navbar** - Navigation menu with links, cart icon, user menu
- **Footer** - Site footer with links, social media, copyright
- **Hero** - Hero section for landing pages
- **ProductCard** - Individual product display card
- **FilterSidebar** - Product filtering and sorting controls
- **FlashDeals** - Flash sales/promotional sections
- **Bundles** - Product bundle displays
- **CategoryTiles** - Category navigation tiles
- **ScrollToTop** - Scroll position management

### State Management: `client/src/store/*.js`

The application uses Zustand for lightweight, hook-based global state management:

- **authStore** - Manages user authentication state:
  - User login status
  - User profile information
  - JWT token storage
  - Authentication functions (login, logout, register)

- **cartStore** - Manages shopping cart state:
  - Cart items array
  - Add/remove item functions
  - Quantity updates
  - Cart total calculations
  - Local storage persistence

### Utilities: `client/src/utils/*.js`

Utility functions and helpers for common operations:
- API request helpers
- Data formatting functions
- Validation utilities
- Constants and configuration

---

## Backend Flow

The backend is built with Node.js and Express.js, following a RESTful API architecture with MongoDB as the database. It uses the Controller-Service-Repository pattern for organized code structure.

### Entry Point: `server/server.js`

The backend server starts when Node.js executes the `server/server.js` file. This file:

1. **Imports dependencies**:
   - `express` - Web framework
   - `cors` - Cross-Origin Resource Sharing middleware
   - `helmet` - Security headers middleware
   - `cookie-parser` - Cookie parsing middleware
   - `dotenv` - Environment variable management
   - Custom modules (routes, middleware, database config)

2. **Loads environment variables**:
   ```javascript
   dotenv.config();
   ```
   - Loads variables from `.env` file
   - Includes database URI, port, JWT secret, client URL

3. **Connects to MongoDB**:
   ```javascript
   connectDB();
   ```
   - Calls `server/config/db.js` to establish database connection
   - Uses Mongoose to connect to MongoDB Atlas or local instance
   - Handles connection errors gracefully

4. **Creates Express application**:
   ```javascript
   const app = express();
   ```

5. **Configures middleware** (in order):
   - `helmet()` - Sets security HTTP headers
   - `cors()` - Enables CORS with credentials for frontend-backend communication
   - `express.json()` - Parses incoming JSON request bodies
   - `express.urlencoded()` - Parses URL-encoded request bodies
   - `cookieParser()` - Parses cookies for JWT token handling

6. **Defines base route**:
   ```javascript
   app.get('/', (req, res) => {
       res.send('API is running...');
   });
   ```
   - Health check endpoint to verify server is running

7. **Mounts API routes**:
   ```javascript
   app.use('/api/users', userRoutes);
   app.use('/api/products', productRoutes);
   app.use('/api/orders', orderRoutes);
   ```
   - Each route handles a specific domain of the application
   - Routes are imported from `server/routes/` directory

8. **Error handling middleware**:
   - `notFound` - Handles 404 errors for undefined routes
   - `errorHandler` - Global error handler for consistent error responses

9. **Starts server**:
   ```javascript
   app.listen(port, () => console.log(`Server started on port ${port}`));
   ```
   - Listens on configured port (default: 5000)
   - Logs startup message

### Database Connection: `server/config/db.js`

The database configuration file:
- Imports Mongoose
- Reads MongoDB connection string from environment variables
- Establishes connection with options (retry writes, server selection timeout)
- Handles connection events (connected, error, disconnected)
- Exports the connection function

### API Routes: `server/routes/*.js`

Routes define the API endpoints and map them to controller functions:

#### `userRoutes.js`
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `POST /api/users/logout` - User logout
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/forgot-password` - Request password reset
- `POST /api/users/reset-password/:token` - Reset password
- `GET /api/users` - Get all users (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)
- `PUT /api/users/:id/admin` - Make user admin (admin only)

#### `productRoutes.js`
- `GET /api/products` - Get all products with pagination/filtering
- `GET /api/products/:id` - Get single product by ID
- `POST /api/products` - Create new product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `GET /api/products/search/:keyword` - Search products by keyword

#### `orderRoutes.js`
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders/myorders` - Get current user's orders
- `GET /api/orders` - Get all orders (admin only)
- `PUT /api/orders/:id/deliver` - Mark order as delivered (admin only)
- `PUT /api/orders/:id/pay` - Mark order as paid

### Controllers: `server/controllers/*.js`

Controllers contain the business logic for each route:

#### `userController.js`
- User registration with password hashing
- User login with JWT token generation
- Profile management
- Password reset functionality
- Admin user management

#### `productController.js`
- Product CRUD operations
- Product search and filtering
- Image upload handling
- Inventory management

#### `orderController.js`
- Order creation from cart
- Order status updates
- Payment processing integration
- Order history retrieval
- Admin order management

### Models: `server/models/*.js`

Mongoose models define the database schema and provide an interface for database operations:

#### `userModel.js`
- User schema with fields:
  - Name, email, password (hashed)
  - isAdmin (boolean)
  - Profile information
- Methods for password comparison
- Indexes for email uniqueness

#### `productModel.js`
- Product schema with polymorphic design for Tech/Fashion:
  - Common fields: name, description, price, images, category, stock
  - Tech-specific fields: specifications, brand, warranty
  - Fashion-specific fields: size, color, material
- Indexes for search optimization

#### `orderModel.js`
- Order schema with fields:
  - User reference
  - Order items (product, quantity, price)
  - Shipping address
  - Payment method and status
  - Order status (pending, processing, delivered, etc.)
  - Total price
- Timestamps for order tracking

### Middleware: `server/middleware/*.js`

Custom middleware for request processing:

#### `errorMiddleware.js`
- `notFound` - Handles 404 errors for undefined routes
- `errorHandler` - Global error handler that:
  - Logs error details
  - Returns consistent error response format
  - Handles Mongoose validation errors
  - Handles JWT authentication errors

#### `authMiddleware.js` (if exists)
- JWT token verification
- User authentication check
- Admin role verification

### Database: MongoDB

The database layer:
- Uses MongoDB as the NoSQL database
- Mongoose ODM for schema validation and queries
- Stores collections for:
  - Users
  - Products
  - Orders
  - Carts (if persisted in database)
- Hosted on MongoDB Atlas or local instance

---

## Complete Request Lifecycle

Here's how a complete request flows through the system:

### Example: User Viewing a Product

1. **User Action**: User navigates to `/product/12345` in the browser

2. **Frontend Routing**:
   - React Router matches the route to `ProductDetailPage`
   - `ProductDetailPage` component mounts

3. **Component Effect**:
   - `useEffect` hook triggers on component mount
   - Makes API call: `fetch('http://localhost:5000/api/products/12345')`

4. **Network Request**:
   - HTTP GET request sent to backend server

5. **Backend Processing**:
   - Request hits `server/server.js`
   - Passes through middleware (helmet, cors, express.json)
   - Matches route `/api/products/:id` in `productRoutes.js`

6. **Controller Execution**:
   - `productController.getProductById` is called
   - Uses Mongoose to query MongoDB: `Product.findById(req.params.id)`
   - Returns product document or throws error if not found

7. **Database Query**:
   - Mongoose executes query on MongoDB
   - Database returns product document

8. **Response**:
   - Controller sends JSON response with product data
   - Response status: 200 OK

9. **Frontend Receives**:
   - `ProductDetailPage` receives JSON response
   - Updates component state with product data
   - React re-renders with product information

10. **User Sees**: Product details displayed on screen

### Example: User Placing an Order

1. **User Action**: User clicks "Place Order" on checkout page

2. **Frontend Processing**:
   - `CheckoutPage` collects order data (items, shipping, payment)
   - Makes POST request: `fetch('http://localhost:5000/api/orders', { method: 'POST', body: JSON.stringify(orderData) })`

3. **Backend Processing**:
   - Request hits server, passes through middleware
   - Matches route `/api/orders` in `orderRoutes.js`
   - `authMiddleware` verifies JWT token from cookies
   - `orderController.createOrder` is called

4. **Controller Logic**:
   - Validates order data
   - Creates new Order document in MongoDB
   - Updates product stock levels
   - Clears user cart (if persisted)
   - Returns created order with ID

5. **Database Operations**:
   - Mongoose creates order document
   - Updates product documents (decrement stock)
   - Transaction ensures data consistency

6. **Response**:
   - Controller returns created order JSON
   - Status: 201 Created

7. **Frontend Processing**:
   - `CheckoutPage` receives order confirmation
   - Redirects to order success page or dashboard
   - Updates cart store to clear items

8. **User Sees**: Order confirmation with order ID

---

## Summary

The Stormy Morning E-Commerce Platform follows a clean, modern architecture:

1. **Starts** at `client/index.html` (frontend) and `server/server.js` (backend)
2. **Frontend** uses React Router to navigate between pages, Zustand for state, and makes API calls to the backend
3. **Backend** uses Express to handle HTTP requests, routes them to controllers, which interact with MongoDB via Mongoose models
4. **Data flows** from user actions → frontend components → API calls → backend routes → controllers → models → database → response → frontend updates
5. **Ends** with the user seeing the updated UI based on their actions

This decoupled architecture allows independent development, testing, and deployment of frontend and backend while maintaining clear separation of concerns and following industry best practices.
