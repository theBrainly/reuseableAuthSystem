# 🔐 Authentication System - Reusable Auth Module

## 📌 Project Overview
This project implements a reusable authentication module using the MERN stack. It includes session-based authentication with Google OAuth and provides a scalable structure for future integrations.

## 🛠️ Tech Stack Used
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: Passport.js (Google OAuth), express-session
- **Database**: MongoDB Atlas
- **Environment Variables**: dotenv
- **Testing**: Postman

## 📁 Folder Structure
/auth-module
│── /config
│   ├── db.js                # Database connection file
│   ├── passportConfig.js    # Passport authentication setup
│── /models
│   ├── User.js              # Mongoose schema for User
│── /routes
│   ├── authRoutes.js        # Authentication routes (Register, Login, Google OAuth, Logout)
│── /middlewares
│   ├── authMiddleware.js    # Middleware to check authentication status
│── /controllers
│   ├── authController.js    # Controller handling authentication logic
│── server.js                # Main server file
│── .env                     # Environment variables (DO NOT COMMIT)
│── package.json             # Dependencies and scripts



## 🛢️ Database Setup & Connection

### 🔹 db.js (Database Connection)
```javascript
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed", error);
        process.exit(1);
    }
};

export default connectDB;

### 🔹 Ensure your .env file contains:

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/auth-db
```


🔑 Authentication Flow
1️⃣ User Registration & Login (Local)
Users register/login with an email & password (hashed).
Sessions are created using express-session.
Middleware verifies authentication before accessing protected routes.
2️⃣ Google OAuth Login (Passport.js)
Users log in using Google OAuth.
If it's the first login, a new user is created in MongoDB without a password.
Sessions store the user’s ID for future authentication.
🚀 API Routes & Usage
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login with email & password
GET	/api/auth/google	Initiate Google OAuth login
GET	/api/auth/google/callback	Google OAuth callback
POST	/api/auth/logout	Logout user & destroy session
GET	/api/auth/session	Check if user is logged in
📌 Session Handling & Logout
🔹 express-session (Session-based Authentication)
Sessions store user authentication status.
Logout destroys the session on the server.
Logout Request (Postman Example):
http
Copy
Edit
POST http://localhost:3000/api/auth/logout
✅ Ensure your server.js has session middleware:

javascript
Copy
Edit
import session from "express-session";
import MongoStore from "connect-mongo";

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { secure: false } // Use secure: true in production
}));
🚀 Future Improvements
✅ Implement GitHub OAuth for more authentication options
✅ Improve security with HTTP-only cookies & CSRF protection
✅ Add refresh tokens for better session persistence
✅ Create a React frontend for seamless authentication UX

🎯 Conclusion
This modular authentication system is built for reusability and security. You can integrate it into multiple MERN projects with minor modifications. 🚀🔥

markdown
Copy
Edit

### **📌 Next Steps**  
✅ **Copy & Paste This Into `README.md`**  
✅ **Save the file in your project root**  
✅ **Open it in GitHub/VS Code to preview it beautifully!**  

Let me know if you need any modifications! 🚀






