# Backend Folder Structure 🗂️

This folder contains all backend-related files for the Finance Website.

## 📁 Folder Structure

```
backend/
├── api/                    # API route handlers
│   ├── auth/
│   │   ├── login.ts       # Login authentication
│   │   └── signup.ts      # User registration
│   ├── users.ts           # User management
│   ├── products.ts        # Financial products
│   ├── blogs.ts           # Blog management
│   ├── loan-queries.ts    # Loan inquiries
│   ├── loan-applications.ts # Loan applications
│   └── support.ts         # Support tickets
├── lib/
│   └── mongodb.js         # Database connection
├── models/                # Database schemas
│   ├── User.ts           # User model
│   ├── Product.ts        # Product model
│   ├── Blog.ts           # Blog model
│   ├── LoanQuery.ts      # Loan query model
│   ├── LoanApplication.ts # Loan application model
│   └── Support.ts        # Support model
├── config/
│   └── database.js       # Database configuration
└── README.md             # This file
```

## 🔧 Backend Components

### 📊 Database Models
- **User**: Authentication and user profiles
- **Product**: Financial products catalog
- **Blog**: Blog posts and articles
- **LoanQuery**: Loan inquiry forms
- **LoanApplication**: Formal loan applications
- **Support**: Customer support tickets

### 🌐 API Endpoints
- **Authentication**: `/api/auth/login`, `/api/auth/signup`
- **Users**: `/api/users`, `/api/users/[id]`
- **Products**: `/api/products`, `/api/products/[id]`
- **Blogs**: `/api/blogs`, `/api/blogs/[id]`
- **Loan Queries**: `/api/loan-queries`, `/api/loan-queries/[id]`
- **Loan Applications**: `/api/loan-applications`, `/api/loan-applications/[id]`
- **Support**: `/api/support`, `/api/support/[id]`

### 🗄️ Database Connection
- **MongoDB Atlas**: Cloud database
- **Connection**: Configured in `lib/mongodb.js`
- **Models**: Mongoose schemas in `models/` folder

## 🚀 Usage

All API routes in the `app/api/` folder now import from this backend folder:

```typescript
import connectDB from '@/backend/lib/mongodb';
import User from '@/backend/models/User';
```

## 🔐 Security Features

- **Authentication**: Login/signup with password validation
- **Role-based Access**: Admin and user roles
- **Data Validation**: Mongoose schema validation
- **Error Handling**: Comprehensive error responses

## 📝 Environment Variables

Required in `.env.local`:
```
MONGODB_URI=mongodb+srv://pallavjoshi:EHjf5Hliz61jvVXb@cluster0.lwadmzq.mongodb.net/finance-website?retryWrites=true&w=majority
```

## 🛠️ Development

The backend is integrated with Next.js API routes and runs automatically when you start the development server:

```bash
npm run dev
```

All backend functionality is now organized in this dedicated folder! 🎉