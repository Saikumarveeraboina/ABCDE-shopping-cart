🛒 ABCDE Ventures – Shopping Cart Assignment

A full-stack e-commerce web application implementing:

User Creation → Authentication → Cart Management → Order Placement

Built with a modern MERN stack and deployed to production.

🚀 Live Demo
🌐 Frontend (Vercel)

👉 https://abcde-shopping-cart.vercel.app

🔗 Backend API (Render)

👉 https://abcde-shopping-cart.onrender.com

📌 Objective

This project fulfills the assignment requirement of building a functional web service and React frontend handling the lifecycle of an e-commerce transaction:

User Registration

Secure Login (JWT Authentication)

Single-Device Session Management

Add Items to Cart

Update Cart Quantity

Remove Items

Checkout → Convert Cart to Order

View Order History

🧠 Special Feature – Single Device Login

To ensure a user can only be logged in on one device:

JWT token is stored inside the User collection

On login:

If a token already exists → Login denied

On logout:

Token is removed from database

Middleware validates:

JWT signature

Token matches stored DB token

This prevents multi-device login sessions.

🛠 Tech Stack
Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

JWT (jsonwebtoken)

bcryptjs

CORS

Render (Deployment)

Frontend

React (Vite)

Axios (API handling)

React Router

React Icons

Custom CSS (Dark/Light theme support)

Vercel (Deployment)

📂 Project Structure
shopping-cart-app/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md

🔐 Authentication Flow
Login
POST /api/users/login


Validates credentials

Checks if token already exists

Generates JWT

Stores token in DB

Returns token to frontend

Logout
POST /api/users/logout


Middleware verifies token

Token removed from DB

Session invalidated

🛒 Cart APIs
Add to Cart
POST /api/carts

Update Quantity
PUT /api/carts

Remove Item
DELETE /api/carts

📦 Orders
Place Order
POST /api/orders


Converts cart to order

Clears cart

Get Orders
GET /api/orders


Returns order history for logged in user

🌗 UI Features

Dark / Light mode toggle

Animated UI

Product grid layout

Cart badge count in Navbar

Quantity control (+ / -)

Checkout summary

Order history view

🔧 Environment Variables
Backend (.env or Render Environment)
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
PORT=5000

Frontend (.env)
VITE_API_URL=https://abcde-shopping-cart.onrender.com/api

🧪 Running Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm run dev

🌍 Deployment
Backend

Hosted on Render

Environment variables configured manually

MongoDB Atlas IP whitelist enabled (0.0.0.0/0)

Frontend

Hosted on Vercel

Uses environment variable for API base URL

📊 Database Collections

users

items

carts

orders

📌 Assignment Completion Summary

✔ User registration
✔ Password hashing with bcrypt
✔ JWT authentication
✔ Single device login enforcement
✔ Cart management
✔ Order placement
✔ Order history
✔ Production deployment
✔ CORS handling
✔ Environment configuration

👨‍💻 Author

Saikumar
Full Stack Developer (MERN)
