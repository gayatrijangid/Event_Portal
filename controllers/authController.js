const bcrypt = require('bcrypt');
const db = require('../config/db');
const { validateSignup, validateLogin } = require('../utils/validator');
const { successResponse, errorResponse } = require('../utils/responseHandler');

/**
 * User Signup Controller
 */
exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;

    // Validate input
    const validation = validateSignup({ name, email, password, confirm_password });
    if (!validation.valid) {
      return errorResponse(res, validation.error, 400);
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
      return errorResponse(res, 'Invalid email domain. Use your official SVKM email', 400);
    }

    // Check if email already exists
    const [existingUsers] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUsers.length > 0) {
      return errorResponse(res, 'Email is already registered', 400);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    return successResponse(res, {
      message: 'Registration successful',
      role: role
    }, 201);
  } catch (error) {
    console.error('Signup error:', error);
    return errorResponse(res, 'Something went wrong. Try again', 500);
  }
};

/**
 * User Login Controller
 */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    const validation = validateLogin({ email, password });
    if (!validation.valid) {
      return errorResponse(res, validation.error, 400);
    }

    // Fetch user from database
    const [users] = await db.query(
      'SELECT id, name AS username, email, password, role FROM users WHERE email = ?',
      [email]
    );

    if (users.length === 0) {
      return errorResponse(res, 'No account found with that email', 401);
    }

    const user = users[0];

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return errorResponse(res, 'Invalid password', 401);
    }

    // Store user info in session
    req.session.user_id = user.id;
    req.session.username = user.username;
    req.session.email = user.email;
    req.session.role = user.role;

    return successResponse(res, {
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
    return errorResponse(res, 'Something went wrong. Try again', 500);
  }
};

/**
 * User Logout Controller
 */
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return errorResponse(res, 'Failed to logout', 500);
    }
    return successResponse(res, { message: 'Logged out successfully' });
  });
};

/**
 * Check Session Status
 */
exports.checkSession = (req, res) => {
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
};
