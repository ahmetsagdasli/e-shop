# Prium E-Commerce Backend API

Modern, secure, and scalable REST API for the Prium E-commerce platform built with Node.js, Express, and MongoDB.

## 🚀 Features

### Core Functionality
- **Authentication & Authorization** - JWT-based auth with role management
- **Product Management** - Full CRUD with images, variants, and specifications
- **Order Management** - Complete order lifecycle with status tracking
- **Shopping Cart** - Real-time cart management
- **User Profiles** - User registration, profiles, and address management
- **Reviews & Ratings** - Product reviews with approval system
- **Categories** - Hierarchical category management
- **Analytics** - Comprehensive dashboard analytics

### Security Features
- **Rate Limiting** - Prevent API abuse
- **CORS Protection** - Cross-origin resource sharing
- **Helmet Security** - Security headers
- **Input Validation** - Request validation with express-validator
- **Password Hashing** - Bcrypt password encryption
- **JWT Authentication** - Secure token-based authentication

### Performance Features
- **Database Indexing** - Optimized MongoDB queries
- **Compression** - Response compression
- **Pagination** - Efficient data loading
- **Aggregation Pipelines** - Complex analytics queries

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB 6+
- npm or yarn

## 🛠️ Installation

1. **Clone the repository**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Environment Setup**
```bash
cp .env.example .env
```

4. **Configure environment variables**
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5175

# Database
MONGODB_URI=mongodb://localhost:27017/prium-ecommerce

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRE=30d

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Cloudinary (Image Upload)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Stripe Payment
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

5. **Start MongoDB**
```bash
# Make sure MongoDB is running locally or use MongoDB Atlas
mongod
```

6. **Seed sample data (optional)**
```bash
npm run seed
```

7. **Start the server**
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe", 
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login User
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Product Endpoints

#### Get All Products
```http
GET /api/products?page=1&limit=12&category=electronics&sort=price_asc
```

#### Get Single Product
```http
GET /api/products/:id
```

#### Create Product (Admin only)
```http
POST /api/products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "iPhone 15 Pro",
  "description": "Latest iPhone model",
  "price": 999.99,
  "category": "category_id",
  "brand": "Apple",
  "sku": "IPH15PRO001",
  "stock": 50
}
```

### Order Endpoints

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "orderItems": [
    {
      "product": "product_id",
      "quantity": 1
    }
  ],
  "shippingAddress": {
    "fullName": "John Doe",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "card"
}
```

#### Get User Orders
```http
GET /api/orders/myorders
Authorization: Bearer <token>
```

### Cart Endpoints

#### Get Cart
```http
GET /api/cart
Authorization: Bearer <token>
```

#### Add to Cart
```http
POST /api/cart/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "product_id",
  "quantity": 1
}
```

### Analytics Endpoints (Admin only)

#### Dashboard Analytics
```http
GET /api/analytics/dashboard
Authorization: Bearer <admin_token>
```

#### Sales Analytics
```http
GET /api/analytics/sales?period=month
Authorization: Bearer <admin_token>
```

## 🗃️ Database Models

### User Model
```javascript
{
  firstName: String,
  lastName: String,
  email: String (unique),
  password: String (hashed),
  role: String (user/admin/moderator),
  avatar: Object,
  addresses: Array,
  wishlist: Array,
  isEmailVerified: Boolean,
  isActive: Boolean
}
```

### Product Model
```javascript
{
  name: String,
  description: String,
  price: Number,
  originalPrice: Number,
  category: ObjectId,
  brand: String,
  sku: String (unique),
  images: Array,
  stock: Number,
  variants: Array,
  specifications: Array,
  ratings: Object,
  isActive: Boolean,
  isFeatured: Boolean
}
```

### Order Model
```javascript
{
  orderNumber: String (unique),
  user: ObjectId,
  items: Array,
  shippingAddress: Object,
  billingAddress: Object,
  paymentMethod: String,
  subtotal: Number,
  totalAmount: Number,
  status: String,
  statusHistory: Array,
  isPaid: Boolean,
  isDelivered: Boolean
}
```

## 🛡️ Security

- **Password Hashing**: Bcrypt with salt rounds
- **JWT Tokens**: Secure authentication tokens
- **Rate Limiting**: 100 requests per 15 minutes per IP
- **Input Validation**: All inputs validated and sanitized
- **CORS**: Configured for frontend origin only
- **Helmet**: Security headers protection

## 📊 Error Handling

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message",
  "errors": [...] // Validation errors array
}
```

## 🔧 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| NODE_ENV | Environment mode | development |
| PORT | Server port | 5000 |
| MONGODB_URI | MongoDB connection string | - |
| JWT_SECRET | JWT signing secret | - |
| JWT_EXPIRE | JWT expiration time | 30d |
| FRONTEND_URL | Frontend application URL | http://localhost:5175 |

## 📈 Performance Monitoring

### Health Check
```http
GET /api/health
```

Response:
```json
{
  "status": "success",
  "message": "Prium E-commerce API is running!",
  "timestamp": "2024-08-24T10:30:00.000Z",
  "environment": "development"
}
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

## 📝 Logging

The API uses Morgan for HTTP request logging in development mode.

## 🔄 API Versioning

Current API version: v1
Base path: `/api/`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Default Users (After Seeding)

- **Admin**: admin@prium.com / admin123
- **User**: john@example.com / password123

## 🔗 Related Projects

- [Frontend Repository](../README.md) - React TypeScript frontend
- [Documentation](./docs/) - Detailed API documentation

## 📞 Support

For support, email support@prium.com or create an issue in the repository.
