# 🎉 Event Portal - Complete Node.js + EJS Full-Stack Application

## ✅ **COMPLETE CONVERSION DONE!**

Your PHP backend has been **fully converted** to Node.js with EJS templates! 🚀

---

## 📋 **What You Have**

### ✅ Backend (Node.js + Express)
- **Authentication API** - Login, Signup, Logout with bcrypt
- **Events API** - Full CRUD operations
- **Registration API** - Event registration with file upload
- **MySQL Integration** - Connection pooling with mysql2
- **Session Management** - express-session with cookies
- **Role-Based Access** - Admin, Faculty, Student roles

### ✅ Frontend (EJS Templates)
- **index.ejs** - Beautiful animated home page
- **login.ejs** - Login form with AJAX
- **signup.ejs** - Signup form with AJAX
- **admin_dashboard.ejs** - Admin panel with event management
- **faculty_dashboard.ejs** - Faculty panel to add/manage events
- **student_dashboard.ejs** - Student panel to browse/register for events

### ✅ Database (MySQL)
- **admin table** - Users with roles
- **events table** - Event information
- **registration table** - Student registrations with proof uploads

---

## 🚀 **Quick Start (Copy & Paste)**

Open PowerShell in `nodejs-backend` folder and run:

```powershell
# Step 1: Install all dependencies
npm install

# Step 2: Create all EJS view files
node create-all-views.js

# Step 3: Setup MySQL database
node setup-db.js

# Step 4: Create public/images directory
New-Item -ItemType Directory -Force -Path public\images

# Step 5: Copy images (adjust paths if needed)
Copy-Item ..\svkm.jpg .\public\images\
Copy-Item ..\Svkmlogo.jpg .\public\images\

# Step 6: Start the server!
npm start
```

**Open browser:** http://localhost:3000

---

## 🎯 **Complete Feature List**

| Feature | Status | Details |
|---------|--------|---------|
| User Registration | ✅ | Email validation, password hashing |
| User Login | ✅ | Session-based authentication |
| Role Assignment | ✅ | Auto-detect based on email domain |
| Admin Dashboard | ✅ | View all events, delete events |
| Faculty Dashboard | ✅ | Create events, manage events |
| Student Dashboard | ✅ | Browse events, search, register |
| Event CRUD | ✅ | Create, Read, Update, Delete |
| File Upload | ✅ | Screenshot upload for registration |
| API Endpoints | ✅ | RESTful API for all operations |
| Database Schema | ✅ | 3 tables with relationships |
| EJS Templates | ✅ | Server-side rendering |
| Responsive Design | ✅ | Mobile-friendly layouts |
| Security | ✅ | Bcrypt, prepared statements, XSS protection |

---

## 📁 **Project Structure**

```
nodejs-backend/
│
├── config/
│   └── db.js                    # MySQL connection pool
│
├── routes/
│   ├── auth.js                  # /api/auth/* endpoints
│   ├── events.js                # /api/events/* endpoints
│   └── registration.js          # /api/registration/* endpoints
│
├── views/                       # EJS Templates
│   ├── index.ejs                # Home page
│   ├── login.ejs                # Login page
│   ├── signup.ejs               # Signup page
│   ├── admin_dashboard.ejs      # Admin panel
│   ├── faculty_dashboard.ejs    # Faculty panel
│   └── student_dashboard.ejs    # Student panel
│
├── public/
│   └── images/                  # Static images (svkm.jpg, Svkmlogo.jpg)
│
├── uploads/                     # User-uploaded files
│
├── database/
│   └── schema.sql               # Complete database schema
│
├── server.js                    # Main Express server
├── package.json                 # Dependencies
├── .env                         # Configuration
├── setup-db.js                  # Database setup script
├── test-connection.js           # Test DB connection
├── create-all-views.js          # Create EJS files
│
├── README.md                    # Original README
├── SETUP.md                     # Setup guide
├── DEPLOYMENT.md                # Deployment guide
└── README_COMPLETE.md           # This file!
```

---

## 🌐 **URLs & Endpoints**

### Frontend Pages
```
GET  /                          - Home page
GET  /login                     - Login page
GET  /signup                    - Signup page
GET  /admin/dashboard           - Admin dashboard (requires admin role)
GET  /faculty/dashboard         - Faculty dashboard (requires faculty role)
GET  /student/dashboard         - Student dashboard (requires student role)
GET  /logout                    - Logout
```

### API Endpoints
```
POST /api/auth/signup           - Register new user
POST /api/auth/login            - Login user
POST /api/auth/logout           - Logout user
GET  /api/auth/session          - Check session status

GET  /api/events                - Get all events
GET  /api/events/:id            - Get single event
POST /api/events                - Create event (Faculty only)
PUT  /api/events/:id            - Update event (Faculty only)
DELETE /api/events/:id          - Delete event (Admin only)

POST /api/registration/:eventId - Register for event (Student only)
GET  /api/registration/my/registrations - Get student's registrations
GET  /api/registration/check/:eventId   - Check if registered
GET  /api/registration/event/:eventId   - Get event registrations (Admin/Faculty)
```

---

## 🔐 **User Roles & Permissions**

### Admin (`admin@svkm.ac.in`)
- ✅ View all events
- ✅ Delete any event
- ✅ View registration statistics
- ❌ Cannot create events

### Faculty (`*@svkm.ac.in`)
- ✅ Create new events
- ✅ Edit their events
- ✅ View all events
- ✅ View registrations
- ❌ Cannot delete events

### Student (`*@svkmmumbai.onmicrosoft.com`)
- ✅ View all events
- ✅ Search events
- ✅ Register for events
- ✅ Upload proof screenshots
- ❌ Cannot create/edit/delete events

---

## 🧪 **Testing**

### Test Database Connection
```powershell
node test-connection.js
```

### Test API with curl
```bash
# Signup
curl -X POST http://localhost:3000/api/auth/signup ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@svkmmumbai.onmicrosoft.com\",\"password\":\"test123\",\"confirm_password\":\"test123\"}"

# Login
curl -X POST http://localhost:3000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@svkmmumbai.onmicrosoft.com\",\"password\":\"test123\"}"

# Get events
curl http://localhost:3000/api/events
```

### Test via Browser
1. Visit http://localhost:3000
2. Click "Get Started" → Signup
3. Create account with `yourname@svkmmumbai.onmicrosoft.com`
4. Login and explore!

---

## 🔧 **Configuration**

Edit `.env` file:

```env
PORT=3000                       # Server port
DB_HOST=localhost               # MySQL host
DB_USER=root                    # MySQL username
DB_PASSWORD=                    # MySQL password (empty for XAMPP default)
DB_NAME=event_portal            # Database name
SESSION_SECRET=change_me        # Session secret key
```

---

## 🐛 **Troubleshooting**

### Problem: Database connection error
**Solution:**
```powershell
# 1. Check if MySQL is running in XAMPP
# 2. Test connection
node test-connection.js
# 3. Verify DB_PASSWORD in .env
```

### Problem: Port 3000 already in use
**Solution:**
```powershell
# Change port in .env
PORT=4000
```

### Problem: Missing views error
**Solution:**
```powershell
# Recreate all view files
node create-all-views.js
```

### Problem: Images not showing
**Solution:**
```powershell
# Ensure images are in correct location
dir public\images
# Should show: svkm.jpg, Svkmlogo.jpg
```

---

## 📊 **Database Schema**

### admin table
```sql
CREATE TABLE admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'faculty', 'student') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### events table
```sql
CREATE TABLE events (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    event_date DATE NOT NULL,
    deadline DATE NOT NULL,
    link VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by INT,
    FOREIGN KEY (created_by) REFERENCES admin(id)
);
```

### registration table
```sql
CREATE TABLE registration (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    student_name VARCHAR(255) NOT NULL,
    event_id INT NOT NULL,
    proof_image VARCHAR(500),
    registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
    UNIQUE KEY (email, event_id)
);
```

---

## 🎨 **Technology Stack**

| Technology | Purpose |
|-----------|---------|
| Node.js | Runtime environment |
| Express.js | Web framework |
| EJS | Template engine |
| MySQL | Database |
| mysql2 | MySQL driver |
| bcrypt | Password hashing |
| express-session | Session management |
| multer | File uploads |
| dotenv | Environment config |
| cors | CORS handling |

---

## 📚 **Comparison: PHP vs Node.js**

| PHP File | Node.js Equivalent |
|----------|-------------------|
| `index.php` | `views/index.ejs` + `GET /` route |
| `login.php` + `login_process.php` | `views/login.ejs` + `/api/auth/login` |
| `signup.php` + `signup_process.php` | `views/signup.ejs` + `/api/auth/signup` |
| `admin_dashboard.php` | `views/admin_dashboard.ejs` + route |
| `dashboard_faculty.php` | `views/faculty_dashboard.ejs` + route |
| `dashboard_student.php` | `views/student_dashboard.ejs` + route |
| `add_event.php` | `/api/events` POST endpoint |
| `edit_event.php` | `/api/events/:id` PUT endpoint |
| `delete_event.php` | `/api/events/:id` DELETE endpoint |
| `register_event.php` | `/api/registration/:eventId` POST |
| `config.php` / `dp.php` | `config/db.js` |
| `logout.php` | `/api/auth/logout` + `GET /logout` |

---

## 🎓 **How It Works**

### Authentication Flow
1. User submits signup form
2. Frontend sends AJAX request to `/api/auth/signup`
3. Backend validates email domain
4. Password is hashed with bcrypt
5. User stored in database with auto-assigned role
6. Success response sent back
7. User redirected to login page

### Event Creation Flow (Faculty)
1. Faculty logs in
2. Access faculty dashboard
3. Fill event form
4. Frontend sends AJAX to `/api/events` POST
5. Backend verifies faculty role in session
6. Event stored in database with `created_by` = faculty ID
7. Success → Dashboard refreshed

### Event Registration Flow (Student)
1. Student logs in
2. Browse events on student dashboard
3. Click event link → External form
4. Upload proof screenshot
5. Frontend sends to `/api/registration/:eventId` with file
6. Backend saves file to `uploads/`
7. Registration record created in database

---

## 🚀 **Deployment to Production**

### Option 1: Traditional Server
```bash
# Install PM2 globally
npm install -g pm2

# Start with PM2
pm2 start server.js --name event-portal

# Auto-start on server reboot
pm2 startup
pm2 save
```

### Option 2: Docker
```dockerfile
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
```

### Option 3: Cloud Platform
- **Heroku**: `git push heroku main`
- **AWS**: Use Elastic Beanstalk
- **DigitalOcean**: App Platform
- **Render**: Connect GitHub repo

---

## 📝 **Next Steps & Enhancements**

### Immediate Improvements
- [ ] Add password reset functionality
- [ ] Email notifications for registrations
- [ ] Export registration data to CSV/Excel
- [ ] Add event categories/tags
- [ ] Calendar view for events

### Advanced Features
- [ ] Real-time notifications (Socket.io)
- [ ] Dashboard analytics & charts
- [ ] Event attendance tracking (QR codes)
- [ ] Multi-file uploads
- [ ] User profile pages
- [ ] Event feedback/ratings

---

## ❓ **FAQs**

**Q: Can I use this with a different database?**  
A: Yes! Replace mysql2 with your preferred database driver (PostgreSQL, MongoDB, etc.)

**Q: How do I change the email domains?**  
A: Edit `routes/auth.js` lines 21-32 to update domain validation

**Q: Can I add more user roles?**  
A: Yes! Update the `role` ENUM in database schema and add corresponding middleware

**Q: Is this production-ready?**  
A: Almost! Add HTTPS, rate limiting, and proper logging for production

---

## 📞 **Support & Help**

### If something doesn't work:

1. **Check Console**: Look at terminal output for errors
2. **Test Database**: Run `node test-connection.js`
3. **Verify Files**: Ensure all views exist in `views/` folder
4. **Check MySQL**: Ensure MySQL is running in XAMPP
5. **Review Logs**: Check error messages carefully

### Common Commands
```powershell
# Reinstall dependencies
Remove-Item -Recurse -Force node_modules
npm install

# Recreate database
node setup-db.js

# Recreate views
node create-all-views.js

# Test everything
node test-connection.js
npm start
```

---

## ✨ **Success! You're Ready!**

Your complete Event Portal is now running on Node.js! 🎉

**Start developing:**
```powershell
npm start
```

**Visit:**  
http://localhost:3000

**Enjoy building!** 🚀

---

**Built with ❤️ by converting PHP to Node.js + EJS**
