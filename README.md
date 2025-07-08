# Shree Raam Hardware - E-commerce Backend

A complete Node.js backend API for the Shree Raam Hardware e-commerce website, built with Express.js, MongoDB, and JWT authentication.

## 🚀 Features

- **User Authentication & Authorization**
  - JWT-based authentication
  - User registration and login
  - Password reset functionality
  - Role-based access control (User/Admin)

- **Product Management**
  - CRUD operations for products
  - Product categorization and filtering
  - Stock management
  - Product search functionality
  - Featured products

- **Shopping Cart**
  - Add/remove items
  - Update quantities
  - Cart persistence
  - Stock validation

- **Order Management**
  - Create and manage orders
  - Order status tracking
  - Payment integration (Razorpay/Stripe)
  - Order history

- **Admin Dashboard**
  - Sales analytics
  - User management
  - Product analytics
  - Order management

- **Security Features**
  - Rate limiting
  - Input validation
  - CORS protection
  - Helmet security headers
  - Password encryption

## 📋 Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd utu
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the example environment file
   cp config/env.example .env
   
   # Edit the .env file with your configuration
   nano .env
   ```

4. **Database Setup**
   ```bash
   # Make sure MongoDB is running
   mongod
   ```

5. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/shree-raam-hardware

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=http://localhost:3000

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Payment Gateway Configuration
RAZORPAY_KEY_ID=your-razorpay-key-id
RAZORPAY_KEY_SECRET=your-razorpay-secret-key
STRIPE_SECRET_KEY=your-stripe-secret-key
STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 📚 API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/profile` - Update user profile
- `PUT /api/auth/change-password` - Change password
- `POST /api/auth/forgot-password` - Forgot password

### Product Endpoints

- `GET /api/products` - Get all products (with pagination and filtering)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get all categories
- `GET /api/products/brands` - Get all brands
- `GET /api/products/category/:category` - Get products by category
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Cart Endpoints

- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item quantity
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart
- `GET /api/cart/count` - Get cart item count

### Order Endpoints

- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/pay` - Update order to paid
- `PUT /api/orders/:id/cancel` - Cancel order
- `GET /api/orders` - Get all orders (Admin only)
- `PUT /api/orders/:id/deliver` - Mark order as delivered (Admin only)
- `PUT /api/orders/:id/status` - Update order status (Admin only)

### User Management Endpoints (Admin Only)

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Admin Dashboard Endpoints

- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/analytics/sales` - Get sales analytics
- `GET /api/admin/analytics/products` - Get product analytics
- `GET /api/admin/analytics/users` - Get user analytics

## 🗄️ Database Models

### User Model
- name, email, password, phone
- address (street, city, state, pincode)
- role (user/admin), isActive
- resetPasswordToken, resetPasswordExpire

### Product Model
- name, description, price, originalPrice
- category, subcategory, brand
- images, stock, sku
- weight, dimensions, specifications
- isActive, isFeatured, rating, numReviews

### Cart Model
- user, items (product, quantity, price)
- totalAmount, totalItems, isActive

### Order Model
- user, orderItems, shippingAddress
- paymentMethod, paymentResult
- itemsPrice, taxPrice, shippingPrice, totalPrice
- isPaid, paidAt, isDelivered, deliveredAt
- status, orderNumber, notes

## 🔒 Security

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: bcryptjs for password hashing
- **Rate Limiting**: Prevents abuse with express-rate-limit
- **CORS Protection**: Configured for frontend communication
- **Helmet**: Security headers for Express
- **Input Validation**: Request validation and sanitization

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production Deployment
```bash
npm start
```

### Environment Setup for Production
1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure MongoDB Atlas or production database
4. Set up proper CORS origins
5. Configure email and payment gateway credentials

## 📝 Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (to be implemented)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions, please contact the development team.

---

**Note**: This backend is designed to work with the Shree Raam Hardware frontend. Make sure to configure the frontend URL in the environment variables for proper CORS handling. 