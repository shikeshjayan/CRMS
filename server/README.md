# CUSTOMER RELATIONSHIP MANAGEMENT SYSTEM 🚀

Full-stack **REST API** built with **Node.js, Express.js, MongoDB** for managing customers, cases, and users.

## ✨ Features

- **✅ CRUD Operations**: Customers, Cases, Users
- **🔒 ObjectId Validation**: MongoDB ID middleware
- **🛡️ Global Error Handling**: Centralized error responses
- **🔐 JWT Authentication**: Cookie-based auth (users)
- **📋 Duplicate Prevention**: Unique name/email/title checks
- **📊 RESTful Routes**: `/api/v1/customers`, `/api/v1/cases`, `/api/v1/users`
- **⚡ Production Ready**: Mongoose schemas, validation, timestamps

## 🛠 Tech Stack

```
Node.js + Express.js + MongoDB (Mongoose)
dotenv + cookie-parser + jsonwebtoken
```

## 🚀 Quick Start

1. **Clone & Install**

```bash
git clone https://github.com/shikeshjayan/crm.git
cd crm
npm install
```

2. **Environment Setup**

```env
# src/config/.env
PORT=3003
MONGO_URL=your_mongodb_atlas_connection_string
JWT_SECRET={secretkey}
```

3. **Run Server**

```bash
npm start
# Server running on http://localhost:3003
```

## 📡 API Endpoints

| Method   | Endpoint                | Description        |
| -------- | ----------------------- | ------------------ |
| `GET`    | `/api/v1/customers`     | Get all customers  |
| `GET`    | `/api/v1/customers/:id` | Get customer by ID |
| `POST`   | `/api/v1/customers`     | Create customer    |
| `PUT`    | `/api/v1/customers/:id` | Update customer    |
| `PATCH`  | `/api/v1/customers/:id` | Partial update     |
| `DELETE` | `/api/v1/customers/:id` | Delete customer    |

**Same pattern for `/cases` and `/users`**

## 🗄 Database Schemas

### Customer

```javascript
{
  name: String (required),
  email: String (unique, lowercase),
  phone: String (required),
  address: String (required),
  status: ["active", "inactive"],
  createdAt, updatedAt
}
```

### Case

```javascript
{
  title: String (required),
  description: String (required),
  priority: ["low", "medium", "high", "urgent"],
  status: ["open", "in_progress", "resolved", "closed"],
  createdAt, updatedAt
}
```

## 📁 Project Structure

```
src/
├── app/
│   ├── app.js (Express setup)
│   ├── controllers/ (CRUD logic)
│   ├── routes/ (API routes)
│   └── ...
├── config/
│   ├── db.js (MongoDB connection)
│   └── .env (Environment vars)
├── errors/ (Global error handler)
└── models/ (Mongoose schemas)
```

## 🔧 Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Production build
npm start
```

## 📄 License

MIT License - Feel free to use in your portfolio!

---

**Built by Shikesh Jayan** 👨‍💻

---
