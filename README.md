# Event Portal - Node.js Backend

 It provides RESTful API endpoints for managing events, user authentication, and event registrations.

## Features

- ✅ User authentication (Login/Signup) with role-based access (Admin, Faculty, Student)
- ✅ Event management (CRUD operations)
- ✅ Event registration with file upload
- ✅ Session-based authentication
- ✅ MySQL database integration
- ✅ RESTful API architecture

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **bcrypt** - Password hashing
- **multer** - File upload handling
- **express-session** - Session management
- **dotenv** - Environment variable management

## Project Structure

```
nodejs-backend/
├── config/
│   └── db.js              # Database connection
├── routes/
│   ├── auth.js            # Authentication routes
│   ├── events.js          # Event management routes
│   └── registration.js    # Registration routes
├── database/
│   └── schema.sql         # Database schema
├── uploads/               # Uploaded files directory
├── .env                   # Environment variables
├── server.js              # Main server file
├── package.json           # Dependencies
└── README.md              # Documentation
```

## Installation

### 1. Install Node.js
Download and install Node.js from [nodejs.org](https://nodejs.org/)

### 2. Install Dependencies
```bash
cd nodejs-backend
npm install
```

### 3. Setup Database
Run the SQL schema file in your MySQL database:
```bash
mysql -u root -p < database/schema.sql
```

Or manually import `database/schema.sql` using phpMyAdmin or MySQL Workbench.

### 4. Configure Environment Variables
Update the `.env` file with your database credentials:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=event_portal
SESSION_SECRET=your_secret_key_here_change_in_production
```

### 5. Start the Server
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start at `http://localhost:3000`

## API Endpoints

### Authentication Routes (`/api/auth`)

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| POST | `/api/auth/logout` | Logout user | Yes |
| GET | `/api/auth/session` | Check session status | No |

### Event Routes (`/api/events`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| GET | `/api/events` | Get all events | No | - |
| GET | `/api/events/:id` | Get single event | No | - |
| POST | `/api/events` | Create new event | Yes | Faculty |
| PUT | `/api/events/:id` | Update event | Yes | Faculty |
| DELETE | `/api/events/:id` | Delete event | Yes | Admin |
| GET | `/api/events/my/events` | Get faculty's events | Yes | Faculty |

### Registration Routes (`/api/registration`)

| Method | Endpoint | Description | Auth Required | Role |
|--------|----------|-------------|---------------|------|
| POST | `/api/registration/:eventId` | Register for event | Yes | Student |
| GET | `/api/registration/my/registrations` | Get student's registrations | Yes | Student |
| GET | `/api/registration/check/:eventId` | Check registration status | Yes | Student |
| GET | `/api/registration/event/:eventId` | Get event registrations | Yes | Admin/Faculty |

## API Usage Examples

### Signup
```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@svkmmumbai.onmicrosoft.com",
    "password": "password123",
    "confirm_password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@svkmmumbai.onmicrosoft.com",
    "password": "password123"
  }'
```

### Create Event (Faculty)
```bash
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Tech Workshop 2024",
    "description": "Learn about latest technologies",
    "date": "2024-12-15",
    "deadline": "2024-12-10",
    "link": "https://forms.google.com/example"
  }'
```

### Register for Event (Student)
```bash
curl -X POST http://localhost:3000/api/registration/1 \
  -F "proof=@/path/to/screenshot.png"
```

## Database Schema

### admin table
- Stores all users (admin, faculty, students)
- Fields: id, name, email, password (hashed), role, created_at

### events table
- Stores event information
- Fields: id, title, description, event_date, deadline, link, created_at, created_by

### registration table
- Stores student event registrations
- Fields: id, email, student_name, event_id, proof_image, registered_at

## Role-Based Access

- **Student**: Can view events and register for them
- **Faculty**: Can create and manage events
- **Admin**: Can delete events and view all registrations

## Email Domain Validation

- Students: `@svkmmumbai.onmicrosoft.com`
- Faculty: `@svkm.ac.in`
- Admin: `admin@svkm.ac.in`

## Security Features

- Password hashing with bcrypt
- Session-based authentication
- Role-based access control
- SQL injection prevention (parameterized queries)
- File upload validation

## Error Handling

The API returns JSON responses with appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

## Testing

Test the health endpoint:
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "Event Portal API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Troubleshooting

### Database Connection Error
- Verify MySQL is running
- Check credentials in `.env` file
- Ensure database exists

### Port Already in Use
- Change PORT in `.env` file
- Kill process using the port: `npx kill-port 3000`

### File Upload Issues
- Ensure `uploads/` directory exists and is writable
- Check file size limits (default: 5MB)


## License

MIT
