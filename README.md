# 🔧 FixItNow — Backend API

A scalable and secure RESTful Backend API for **FixItNow**, a Home Service Marketplace that connects customers with professional technicians.

Built with **Node.js, Express.js, TypeScript, Prisma ORM, and PostgreSQL**, this backend provides authentication, role-based authorization, service management, booking management, payment processing, and review functionality.

## 🌐 Live API

- **Backend API:** [FixItNow API](https://fixitnow-server-ivory.vercel.app)
- **Frontend Application:** [FixItNow Website](https://fix-it-now-frontend-bay.vercel.app)
- **Frontend Repository:** [GitHub Repository](https://github.com/sakibulamin/-FixItNow-Frontend)
- **Demo Video:** [Watch Project Demo](https://drive.google.com/file/d/1TAhOiwojVmJeDKqr63yUjFG2XMXMrc08/view?usp=sharing)

## 📖 Project Overview

FixItNow Backend is the server-side application that powers the FixItNow Home Service Marketplace.

It provides RESTful APIs for customers, technicians, and administrators to manage services, bookings, payments, and platform activities.

The API follows role-based access control to ensure that users can only access resources and perform actions according to their assigned roles.

## ✨ Key Features

- **JWT Authentication:** Secure user authentication using JSON Web Tokens.
- **Role-Based Authorization:** Access control for Customer, Technician, and Admin roles.
- **User Management:** Manage user accounts and profiles.
- **Service Management:** Create, update, and manage home services.
- **Category Management:** Organize services into different categories.
- **Booking Management:** Handle service booking requests and booking statuses.
- **Payment Integration:** Process online payments using SSLCommerz.
- **Review System:** Allow customers to review and rate technicians.
- **Global Error Handling:** Centralized error handling for consistent API responses.

## 👥 User Roles

### 👤 Customer
- Register and log in.
- Browse available services.
- Book technicians.
- Make online payments.
- Manage booking history.
- Submit reviews and ratings.
- Update profile information.

### 🔧 Technician
- Manage technician profiles.
- Create and manage services.
- Accept or reject booking requests.
- Update booking statuses.
- Manage availability.

### 🛡️ Admin
- Manage users.
- Manage service categories.
- Monitor bookings.
- Access platform management features.

## 💳 Payment Integration

Integrated **SSLCommerz Payment Gateway** for secure online payment processing.

Payment statuses include:

- Pending
- Completed
- Failed
- Cancelled

## 🛠️ Technology Stack

### Backend
- Node.js
- Express.js
- TypeScript

### Database & ORM
- PostgreSQL
- Prisma ORM

### Authentication & Security
- JWT Authentication
- Role-Based Authorization

### Payment Gateway
- SSLCommerz

### Development Tools
- Git & GitHub
- Postman
- VS Code
- Vercel

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone YOUR_BACKEND_REPOSITORY_URL
```

### 2. Navigate to the Project Directory

```bash
cd FixItNow-Backend
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env` file in the project root.

Configure the required environment variables according to your project setup.

Example:

```env
PORT=5000
DATABASE_URL=your_postgresql_database_url
JWT_SECRET=your_jwt_secret
SSL_STORE_ID=your_sslcommerz_store_id
SSL_STORE_PASSWORD=your_sslcommerz_store_password
```

> Never commit your actual `.env` file or expose database credentials, JWT secrets, or SSLCommerz credentials publicly.

### 5. Generate Prisma Client

```bash
npx prisma generate
```

### 6. Run Database Migrations

```bash
npx prisma migrate dev
```

### 7. Start Development Server

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:5000
```


## 🔗 Frontend Integration

This backend API is integrated with the FixItNow frontend application.

- **Frontend:** [FixItNow](https://fix-it-now-frontend-bay.vercel.app)
- **Frontend Source Code:** [GitHub Repository](https://github.com/sakibulamin/-FixItNow-Frontend)

## Deployment

The backend API is deployed on Vercel.

[Visit Live Backend API](https://fixitnow-server-ivory.vercel.app)

## 👨‍💻 Author

**Sakibul Amin**

Full-Stack Developer

- **GitHub:** [github.com/sakibulamin](https://github.com/sakibulamin)
- **Portfolio:** [sakibul-amin.vercel.app](https://sakibul-amin.vercel.app)
- **LinkedIn:** [linkedin.com/in/sakibul-amin7](https://www.linkedin.com/in/sakibul-amin7)
- **Email:** info.sakibulamin@gmail.com

---
