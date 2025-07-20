# UTU Backend (Node.js + Express + MongoDB)

This backend provides user registration and login for your project using Node.js, Express, MongoDB, JWT, and bcrypt.

## Features
- Register new users (name, email, password, phone, address)
- Login with email and password
- Passwords are hashed for security
- JWT authentication

## Setup

1. **Clone the repo and go to the backend folder:**
   ```sh
   cd utu-backend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in your values:
     ```sh
     cp .env.example .env
     ```
   - Edit `.env`:
     - `MONGODB_URI` (your MongoDB connection string)
     - `JWT_SECRET` (any random string)
     - `PORT` (default 5000)
4. **Start the server:**
   ```sh
   npm run dev
   # or
   npm start
   ```

## API Endpoints

### Register
- **POST** `/api/register`
- Body: `{ name, email, password, phone, address }`
- Response: `{ success, message }`

### Login
- **POST** `/api/login`
- Body: `{ email, password }`
- Response: `{ success, token, user }` on success

## Example .env
```
MONGODB_URI=mongodb://localhost:27017/utu-auth
JWT_SECRET=your_jwt_secret_here
PORT=5000
```

---

**Connect your frontend to these endpoints for real registration and login!** 