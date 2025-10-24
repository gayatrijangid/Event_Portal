# 🚀 Complete Setup Guide - Event Portal Node.js

## ✅ You have a complete full-stack application!

**Backend:** Node.js + Express + MySQL  
**Frontend:** EJS templates with integrated JavaScript  
**Features:** Authentication, Events, Registration, File Upload

---

## 📦 Quick Setup (5 steps)

### Step 1: Install Dependencies
```powershell
npm install
```

### Step 2: Create All Views
```powershell
node create-all-views.js
```

### Step 3: Setup Database
```powershell
node setup-db.js
```

### Step 4: Copy Images
```powershell
# Create images directory
New-Item -ItemType Directory -Force -Path public\images

# Copy images from parent folder
Copy-Item ..\svkm.jpg .\public\images\
Copy-Item ..\Svkmlogo.jpg .\public\images\
```

### Step 5: Start Server
```powershell
npm start
```

**Open:** http://localhost:3000

---

## 🎯 What's Included

### ✅ Backend API Routes
- `/api/auth/signup` - Register
- `/api/auth/login` - Login
- `/api/auth/logout` - Logout
- `/api/events` - CRUD operations
- `/api/registration/:eventId` - Event registration

### ✅ Frontend Pages
- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/admin/dashboard` - Admin panel
- `/faculty/dashboard` - Faculty panel
- `/student/dashboard` - Student panel

### ✅ Database Tables
- `admin` - Users (admin, faculty, students)
- `events` - Event information
- `registration` - Student registrations

---

## 🔐 Test Users

After running setup:

**Admin:**
- Email: `admin@svkm.ac.in`
- Create password during first signup

**Faculty:**
- Email: Any ending with `@svkm.ac.in`
- Auto-assigned role

**Student:**
- Email: Any ending with `@svkmmumbai.onmicrosoft.com`
- Auto-assigned role

---

## 🛠️ Troubleshooting

### Database Connection Error

```powershell
# Test connection
node test-connection.js
```

**Fix:** Check if MySQL is running in XAMPP Control Panel

### Missing Views Error

```powershell
# Recreate all views
node create-all-views.js
```

### Port 3000 Already in Use

Edit `.env`:
```
PORT=4000
```

---

## 📂 File Structure

```
nodejs-backend/
├── views/              ✅ EJS templates
│   ├── index.ejs
│   ├── login.ejs
│   ├── signup.ejs
│   ├── admin_dashboard.ejs
│   ├── faculty_dashboard.ejs
│   └── student_dashboard.ejs
├── routes/             ✅ API endpoints
│   ├── auth.js
│   ├── events.js
│   └── registration.js
├── config/             ✅ Database
│   └── db.js
├── public/             ✅ Static files
│   └── images/
├── uploads/            ✅ User uploads
├── database/           ✅ SQL schema
│   └── schema.sql
├── server.js           ✅ Main server
├── package.json        ✅ Dependencies
└── .env                ✅ Configuration
```

---

## 🎨 Features

✅ User authentication (bcrypt)  
✅ Role-based access control  
✅ Event management (CRUD)  
✅ Event registration  
✅ File upload (Multer)  
✅ Session management  
✅ Email domain validation  
✅ Responsive design  
✅ RESTful API  
✅ Server-side rendering (EJS)

---

## 🚀 Usage

1. **Signup** with institutional email
2. **Login** with credentials
3. **Admin/Faculty:** Create and manage events
4. **Students:** Browse and register for events

---

## 📊 API Testing

### Using curl:

```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@svkmmumbai.onmicrosoft.com","password":"pass123","confirm_password":"pass123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@svkmmumbai.onmicrosoft.com","password":"pass123"}'

# Get events
curl http://localhost:3000/api/events
```

### Using Browser:
Just visit http://localhost:3000 and use the web interface!

---

## 🔥 Running in Production

```bash
# Set environment to production
$env:NODE_ENV="production"

# Use PM2 for process management
npm install -g pm2
pm2 start server.js --name event-portal

# View logs
pm2 logs event-portal

# Restart
pm2 restart event-portal
```

---

## 📝 Dependencies

```json
{
  "express": "Web framework",
  "mysql2": "MySQL client",
  "bcrypt": "Password hashing",
  "express-session": "Session management",
  "multer": "File uploads",
  "ejs": "Template engine",
  "dotenv": "Environment config",
  "cors": "CORS handling"
}
```

---

## 💡 Tips

1. **Development:** Use `npm run dev` for auto-reload (requires nodemon)
2. **Testing:** Use Postman for API testing
3. **Debugging:** Check console logs in terminal
4. **Database:** Use phpMyAdmin to view tables

---

## 🎓 Next Steps

1. Add email notifications
2. Implement password reset
3. Add event categories
4. Export registration data
5. Add dashboard analytics

---

## ✨ You're All Set!

**Start the server:**
```bash
npm start
```

**Visit:**
```
http://localhost:3000
```

Enjoy your Event Portal! 🎉
