const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));


// Import routes
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const registrationRoutes = require('./routes/registration');
const db = require('./config/db');

// Set EJS as view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'your_secret_key_here',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // Set to true if using HTTPS
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 hours
  }
}));

// Serve static files (for uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Middleware to check authentication
const requireAuth = (req, res, next) => {
  if (!req.session.user_id) {
    return res.redirect('/login');
  }
  next();
};

const requireRole = (role) => {
  return (req, res, next) => {
    if (req.session.role !== role) {
      return res.redirect('/login');
    }
    next();
  };
};

// View Routes
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

app.get('/signup', (req, res) => {
  res.render('signup', { error: null });
});

app.get('/admin/dashboard', requireAuth, requireRole('admin'), async (req, res) => {
  try {
    const [events] = await db.query(`
      SELECT events.*, 
             (SELECT COUNT(*) FROM registration WHERE registration.event_id = events.id) AS student_count
      FROM events
      ORDER BY events.event_date DESC
    `);
    res.render('admin_dashboard', { events, user: req.session });
  } catch (error) {
    res.status(500).send('Error loading dashboard');
  }
});

app.get('/faculty/dashboard', requireAuth, requireRole('faculty'), async (req, res) => {
  try {
    const [events] = await db.query('SELECT * FROM events ORDER BY event_date DESC');
    res.render('faculty_dashboard', { events, user: req.session });
  } catch (error) {
    res.status(500).send('Error loading dashboard');
  }
});

app.get('/student/dashboard', requireAuth, requireRole('student'), async (req, res) => {
  try {
    const searchTerm = req.query.search || '';
    const today = new Date().toISOString().split('T')[0];
    let events;
    
    if (searchTerm) {
      [events] = await db.query(
        "SELECT * FROM events WHERE (title LIKE ? OR description LIKE ?) AND deadline >= ? ORDER BY event_date DESC",
        [`%${searchTerm}%`, `%${searchTerm}%`, today]
      );
    } else {
      [events] = await db.query('SELECT * FROM events WHERE deadline >= ? ORDER BY event_date DESC', [today]);
    }
    
    res.render('student_dashboard', { events, user: req.session, searchTerm });
  } catch (error) {
    res.status(500).send('Error loading dashboard');
  }
});

app.get('/register/:eventId', requireAuth, requireRole('student'), async (req, res) => {
  try {
    const { eventId } = req.params;
    const email = req.session.email;

    // Get event details
    const [events] = await db.query('SELECT * FROM events WHERE id = ?', [eventId]);
    if (events.length === 0) {
      return res.status(404).send('Event not found');
    }

    // Check if already registered
    const [registrations] = await db.query(
      'SELECT * FROM registration WHERE email = ? AND event_id = ?',
      [email, eventId]
    );

    res.render('register_event', {
      event: events[0],
      isRegistered: registrations.length > 0,
      user: req.session
    });
  } catch (error) {
    console.error('Registration page error:', error);
    res.status(500).send('Error loading registration page');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/registration', registrationRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Event Portal API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
