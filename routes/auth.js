const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/db');

// Signup Route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;

    // Validate input
    if (!name || !email || !password || !confirm_password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check password match
    if (password !== confirm_password) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }

    // Validate email domain and assign role
    const student_domain = '@svkmmumbai.onmicrosoft.com';
    const faculty_domain = '@svkm.ac.in';
    let role;

    if (email.endsWith(student_domain)) {
      role = 'student';
    } else if (email === 'admin@svkm.ac.in') {
      role = 'admin';
    } else if (email.endsWith(faculty_domain)) {
      role = 'faculty';
    } else {
      return res.status(400).json({ error: 'Invalid email domain. Use your official SVKM email' });
    }

    // Check if email already exists
    const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      role: role
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Something went wrong. Try again' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Fetch user from database
    const [users] = await db.query(
      'SELECT id, name AS username, email, password, role FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ error: 'No account found with that email' });
    }

    const user = users[0];

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Store user info in session
    req.session.user_id = user.id;
    req.session.username = user.username;
    req.session.email = user.email;
    req.session.role = user.role;

    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Something went wrong. Try again' });
  }
});

// Logout Route
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
});

// Check session route
router.get('/session', (req, res) => {
  if (req.session.user_id) {
    res.json({
      loggedIn: true,
      user: {
        id: req.session.user_id,
        username: req.session.username,
        email: req.session.email,
        role: req.session.role
      }
    });
  } else {
    res.json({ loggedIn: false });
  }
});

module.exports = router;
