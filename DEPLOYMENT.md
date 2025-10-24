# Event Portal - Node.js + EJS Deployment Guide

## ✅ Complete Full-Stack Application

This is a complete Node.js + Express + MySQL + EJS application with:
- Backend API (RESTful endpoints)
- Frontend Views (EJS templates)
- Database integration (MySQL)
- Session management
- File uploads
- Role-based authentication

## 📦 Installation Steps

### 1. Install Dependencies
```bash
cd nodejs-backend
npm install
```

### 2. Setup Database
Run the setup script to create database and tables:
```bash
node setup-db.js
```

Or manually import:
```bash
mysql -u root -p < database/schema.sql
```

### 3. Copy Images
Copy your images from parent directory:
```bash
# Create directory
mkdir -p public/images

# Copy images (Windows PowerShell)
Copy-Item ..\svkm.jpg .\public\images\
Copy-Item ..\Svkmlogo.jpg .\public\images\
```

### 4. Configure Environment
Edit `.env` file if needed (database password, etc.)

### 5. Start Server
```bash
npm start
```

Visit: **http://localhost:3000**

## 📁 Project Structure

```
nodejs-backend/
├── config/
│   └── db.js                 # Database connection
├── routes/
│   ├── auth.js              # Authentication API
│   ├── events.js            # Events API
│   └── registration.js      # Registration API
├── views/                    # EJS Templates
│   ├── index.ejs            # Home page
│   ├── login.ejs            # Login page
│   ├── signup.ejs           # Signup page
│   ├── admin_dashboard.ejs  # Admin dashboard
│   ├── faculty_dashboard.ejs # Faculty dashboard
│   └── student_dashboard.ejs # Student dashboard
├── public/
│   └── images/              # Static images
├── uploads/                 # User uploads
├── database/
│   └── schema.sql           # Database schema
├── server.js                # Main server file
├── package.json             # Dependencies
└── .env                     # Configuration

```

## 🎯 Features

### Backend API Endpoints

**Authentication:**
- POST `/api/auth/signup` - Register new user
- POST `/api/auth/login` - Login user
- POST `/api/auth/logout` - Logout user
- GET `/api/auth/session` - Check session

**Events:**
- GET `/api/events` - Get all events
- GET `/api/events/:id` - Get single event
- POST `/api/events` - Create event (Faculty)
- PUT `/api/events/:id` - Update event (Faculty)
- DELETE `/api/events/:id` - Delete event (Admin)

**Registration:**
- POST `/api/registration/:eventId` - Register for event (Student)
- GET `/api/registration/my/registrations` - Get student registrations
- GET `/api/registration/event/:eventId` - Get event registrations (Admin/Faculty)

### Frontend Pages

- `/` - Home page
- `/login` - Login page
- `/signup` - Signup page
- `/admin/dashboard` - Admin dashboard
- `/faculty/dashboard` - Faculty dashboard
- `/student/dashboard` - Student dashboard
- `/logout` - Logout

## 🔐 User Roles

1. **Admin** (`admin@svkm.ac.in`)
   - View all events
   - Delete events
   - View registration statistics

2. **Faculty** (`*@svkm.ac.in`)
   - Create events
   - Edit events
   - View registrations

3. **Student** (`*@svkmmumbai.onmicrosoft.com`)
   - View events
   - Register for events
   - Upload proof screenshots

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Setup database
node setup-db.js

# Copy images
node create-views.js

# Start server
npm start
```

## 🌐 Default Ports

- **Application:** http://localhost:3000
- **API:** http://localhost:3000/api
- **MySQL:** localhost:3306

## 📝 Environment Variables

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=event_portal
SESSION_SECRET=your_secret_key_here
```

## 🔧 Troubleshooting

### Database Connection Error
```bash
# Test connection
node test-connection.js

# Check MySQL status in XAMPP
# Verify DB_PASSWORD in .env
```

### Port Already in Use
```bash
# Change PORT in .env
# Or kill process
npx kill-port 3000
```

### Missing Views Error
The views are created in `views/` folder. If you get errors about missing views, ensure all EJS files exist.

## 📚 Technology Stack

- **Backend:** Node.js + Express.js
- **Database:** MySQL
- **Template Engine:** EJS
- **Authentication:** Sessions (express-session)
- **Password Hashing:** bcrypt
- **File Uploads:** Multer
- **Environment Config:** dotenv

## 🎨 Features Implemented

✅ User authentication with bcrypt
✅ Role-based access control
✅ Session management
✅ Event CRUD operations
✅ Event registration with file upload
✅ Email domain validation
✅ Responsive design
✅ RESTful API
✅ Server-side rendering with EJS
✅ MySQL database integration

## 📦 npm Scripts

```json
{
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

## 🔒 Security Features

- Password hashing with bcrypt (10 rounds)
- SQL injection prevention (parameterized queries)
- Session-based authentication
- Role-based authorization
- File upload validation
- XSS protection (EJS auto-escaping)

## 📊 Database Schema

### admin table
```sql
id, name, email, password (hashed), role, created_at
```

### events table
```sql
id, title, description, event_date, deadline, link, created_at, created_by
```

### registration table
```sql
id, email, student_name, event_id, proof_image, registered_at
```

## 🎓 Usage

1. **Signup** with your institutional email
2. **Login** with credentials
3. **Admin/Faculty:** Manage events
4. **Students:** Browse and register for events
5. Upload proof screenshots when registering

## 🚨 Important Notes

- Default admin: `admin@svkm.ac.in` (set password during signup)
- Students must use `@svkmmumbai.onmicrosoft.com` email
- Faculty must use `@svkm.ac.in` email
- File uploads stored in `uploads/` directory
- Sessions expire after 24 hours

## 📞 Support

For issues:
1. Check console logs for errors
2. Run `node test-connection.js` to verify database
3. Ensure all dependencies are installed
4. Verify MySQL is running in XAMPP

---

**Built with ❤️ for SVKM Institute**
