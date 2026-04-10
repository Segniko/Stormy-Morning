# API Specification (Plan)

Base URL: `http://localhost:5000/api`

## Auth Endpoints
- `POST /auth/register` - Create new account
- `POST /auth/login` - Login & get JWT in Cookie/Body
- `GET /auth/me` - Get current user profile (Protected)
- `POST /auth/logout` - Clear cookies

## Product Endpoints
- `GET /products` - List all products (with filters for Cat, Price, Brand)
- `GET /products/:id` - Detailed view (Dual-Spec data)
- `POST /products` - Create new product (Admin only)
- `PATCH /products/:id` - Update product (Admin only)

## Order Endpoints
- `POST /orders` - Create new order (Mock payment logic)
- `GET /orders/mine` - View personal order history
- `GET /orders/:id` - view specific order status/tracking
- `GET /orders` - View all orders (Admin only)

## Category Endpoints
- `GET /categories` - Return list of available categories & icons
