# Course Management API

## 📌 Overview
A backend API built with **Node.js, Express.js, and MongoDB** that supports:
- User Authentication (JWT, Access + Refresh Tokens)
- Role-based access (Admin/User)
- Course Management (Create/Delete by Admin, View for Users)
- Purchase System
- Centralized Error Handling

## 🚀 Setup

```bash
git clone https://github.com/siyamar/course_managment_api.git
cd course_management_api
npm install
```

Create `.env` file:
```
PORT=3000
DB_URL=mongodb+srv://abdur:abdur_1234@cluster0.kbgngea.mongodb.net/courseDB;
```

Run the server:
npm start


## 📌 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/refresh`
- `POST /api/auth/logout`

### Courses
- `GET /api/courses`
- `GET /api/courses/:id`
- `POST /api/courses` (Admin only)
- `DELETE /api/courses/:id` (Admin only)

### Purchases
- `POST /api/purchases`
- `GET /api/purchases`

## 🧪 Postman Collection
Check `postman_collection/course_management_api.postman_collection` for API tests.


## ✨ Features Explanation

- User Authentication
Secure login and registration using JWT tokens (access + refresh). Ensures safe user sessions and token renewal without re-login.

- Role-Based Access Control (RBAC)
Admin → Can create and delete courses.
User → Can only view courses and purchase them.
This prevents unauthorized access to admin-only features.

- Course Management
Admins can add new courses with details (title, description, price, etc.).
Users can browse all courses or view a single course by ID.

- Purchase System
Users can buy courses. The system prevents duplicate purchases by checking if the user already bought the course. Purchased courses are linked to the user for easy access later.

- Centralized Error Handling
All errors (e.g., invalid tokens, unauthorized access, missing data) are handled by a global error handler, making responses consistent and easy to debug.

- Database Integration (MongoDB)
Uses MongoDB with Mongoose for structured schemas and relationships (e.g., purchases reference users and courses).