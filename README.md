 
# Finance Management Backend API

## Overview

This project is a **Finance Management Backend System** built using **Node.js, Express, TypeScript, and PostgreSQL (Neon DB)**.

The system allows users to:

* Register and authenticate securely
* Manage financial records (income and expenses)
* View financial summaries and analytics
* Access features based on assigned roles
* Enforce secure and controlled API access

This backend demonstrates **secure authentication, role-based access control, financial record management, and dashboard analytics**, designed with real-world backend architecture principles.

---

# Tech Stack

Backend Technologies:

* Node.js
* Express.js
* TypeScript
* PostgreSQL (Neon Database)
* JSON Web Tokens (JWT)
* bcrypt (Password hashing)
* express-rate-limit (API security)
* Zod (Validation)

Database:

* PostgreSQL (Hosted on Neon DB)

---

# Project Features

## Authentication System

* User registration
* Secure password hashing using bcrypt
* Login with JWT token generation
* Token-based authentication
* Role-based authorization
* Protected API routes

Supported Roles:

* **Viewer**

  * Read-only access
* **Analyst**

  * View financial data
  * Access dashboard summaries
* **Admin**

  * Full system access
  * Manage users and records

---

## Financial Records Management

Each financial record contains:

* Amount
* Type (income or expense)
* Category
* Date
* Notes
* User ownership

Supported Operations:

* Create financial record
* Retrieve records
* Update records
* Soft delete records
* Filter records
* Role-based access enforcement

Filtering Support:

* By type (income/expense)
* By category
* By date range

---

## Dashboard Summary APIs

Provides aggregated financial insights.

Available Summaries:

* Total income
* Total expenses
* Net balance
* Category-wise totals
* Monthly financial trends
* Recent financial activity

These endpoints demonstrate **backend aggregation logic**, not just CRUD functionality.

---

## Access Control Logic

Role-based authorization is enforced using middleware.

Permissions:

| Role    | Create | Read | Update | Delete |
| ------- | ------ | ---- | ------ | ------ |
| Viewer  | ❌      | ✅    | ❌      | ❌      |
| Analyst | ❌      | ✅    | ❌      | ❌      |
| Admin   | ✅      | ✅    | ✅      | ✅      |

Authorization is handled using:

* JWT verification middleware
* Role-check middleware

---

## Security Features

The system includes multiple security layers:

* Password hashing using bcrypt
* JWT authentication
* Role-based access control
* Input validation
* Rate limiting
* Secure database queries
* Soft delete mechanism
* Error handling middleware

---

# Folder Structure

```text
Finance/
│
├── src/
│   ├── config/
│   │   └── db.ts
│   │
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── finance.controller.ts
│   │   └── dashboard.controller.ts
│   │
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── role.middleware.ts
│   │   └── rateLimit.middleware.ts
│   │
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   ├── finance.routes.ts
│   │   └── summary.routes.ts
│   │
│   ├── service/
│   │   ├── auth.service.ts
│   │   ├── finance.service.ts
│   │   └── summary.service.ts
        |__catagory.services.ts
│   │
│   ├── utils/
│   │   ├── jwt.ts
│   │   └── hash.ts
│   │
│   ├── validators/
│   │   └── auth.validator.ts
│   │
│   ├── types/
│   │   └── express.d.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

---

# Installation & Setup

Follow these steps to run the project locally.

---

## Step 1 — Clone Repository

```bash
git clone https://github.com/SohamEngineer/Finance-.git
cd finance-backend
```

---

## Step 2 — Install Dependencies

```bash
npm install
```

---

## Step 3 — Setup Environment Variables

Create `.env` file:

```env
PORT=5000

DATABASE_URL='postgresql://neondb_owner:npg_lqUhdFM6Sw5K@ep-red-bar-angzg55y-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'

JWT_SECRET=sohamsecret123

JWT_EXPIRES_IN=1d
```

---

## Step 4 — Setup Database

Run the following SQL queries in Neon:

### Roles Table

```sql
CREATE TABLE roles (

  id SERIAL PRIMARY KEY,

  name VARCHAR(50) UNIQUE NOT NULL

);
```

Insert roles:

```sql
INSERT INTO roles (name)
VALUES
('viewer'),
('analyst'),
('admin');
```

---

### Users Table

```sql
CREATE TABLE users (

  id UUID PRIMARY KEY
  DEFAULT gen_random_uuid(),

  name VARCHAR(100),

  email VARCHAR(100) UNIQUE,

  password TEXT,

  role_id INT
  REFERENCES roles(id),

  is_active BOOLEAN DEFAULT true,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
```

---

### Finance Table

```sql
CREATE TABLE finance_record (

  id UUID PRIMARY KEY
  DEFAULT gen_random_uuid(),

  user_id UUID
  REFERENCES users(id),

  amount DECIMAL(12,2),

  type VARCHAR(20)
  CHECK (type IN ('income','expense')),

  category VARCHAR(100),

  date DATE,

  notes TEXT,

  is_deleted BOOLEAN DEFAULT false,

  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);
```

---

## Step 5 — Run Server

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

Server will run at:

```text
http://localhost:5000
```

---

# API Endpoints

---

## Authentication APIs

### Register User

```http
POST /api/auth/register
```

Body:

```json
{
  "name": "Soham",
  "email": "soham@gmail.com",
  "password": "Password123"
}
```

---

### Login

```http
POST /api/auth/login
```

Response:

```json
{
  "token": "JWT_TOKEN"
}
```

---

## Finance APIs

### Create Record (Admin)

```http
POST /api/finance
```

Headers:

```http
Authorization: Bearer TOKEN
```

Body:

```json
{
  "amount": 5000,
  "type": "income",
  "category": "Salary",
  "date": "2026-04-04",
  "notes": "Monthly salary"
}
```

---

### Get Records

```http
GET /api/finance
```

Optional Filters:

```http
GET /api/finance?type=income
GET /api/finance?category=Food
GET /api/finance?startDate=2026-01-01
```

---

### Update Record

```http
PATCH /api/finance/:id
```

---

### Delete Record

```http
DELETE /api/finance/:id
```

Soft delete enabled.

---

## Dashboard APIs

### Get Dashboard Summary

```http
GET /api/dashboard/summary
```

Returns:

```json
{
  "totalIncome": 50000,
  "totalExpense": 30000,
  "netBalance": 20000,
  "categoryTotals": [],
  "monthlyTrend": []
}
```

---

# Data Persistence

All application data is stored in **PostgreSQL (Neon DB)**.

Data remains available even after:

* Server restart
* Application crash
* System reboot

Soft deletion is implemented to preserve historical data.

---

# Assumptions Made

The following assumptions were made during development:

1. Users are assigned roles during creation.
2. Admin users manage financial records.
3. Financial records belong to a specific user.
4. All financial data must remain persistent.
5. Dashboard data is calculated dynamically.
6. Each user accesses only their own records.

---

# Trade-offs Considered

Several design trade-offs were evaluated.

---

## JWT vs Session Authentication

Chosen:

```text
JWT Authentication
```

Advantages:

* Stateless
* Scalable
* Suitable for APIs

Trade-off:

* Token expiration management required
* Logout handling complexity

---

## Soft Delete vs Hard Delete

Chosen:

```text
Soft Delete
```

Advantages:

* Data recovery possible
* Audit-friendly
* Safer deletion

Trade-off:

* Increased storage usage
* Slightly slower queries

---

## Role-Based Authorization

Chosen:

```text
Separate roles table
```

Advantages:

* Flexible role management
* Scalable design

Trade-off:

* Requires JOIN queries
* Slight increase in query complexity

---

## Rate Limiting Implementation

Chosen:

```text
Moderate rate limiting
```

Advantages:

* Prevents abuse
* Improves API security

Trade-off:

* May restrict heavy users
* Adds middleware overhead

---

# Future Improvements

Possible enhancements:

* Caching dashboard results
* Email notifications
* Multi-currency support
* Advanced analytics
* Export reports
* Audit logging
* API versioning

---

# Testing

APIs were tested using:

* Postman
* Manual testing
* Edge-case validation

Tested Scenarios:

* Invalid input
* Unauthorized access
* Role restrictions
* Database errors
* Missing fields

---

# Error Handling

The system includes:

* Validation errors
* Authentication errors
* Authorization errors
* Database error handling
* Graceful failure responses

---


# Author

Developed by:

**Soham Ata**

Backend Developer
Finance Backend System
