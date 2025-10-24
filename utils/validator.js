/**
 * Validation Utility
 * Provides validation functions for user input
 */

/**
 * Validate email format
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate SVKM email domain
 */
const isValidSVKMEmail = (email) => {
  const studentDomain = '@svkmmumbai.onmicrosoft.com';
  const facultyDomain = '@svkm.ac.in';
  return email.endsWith(studentDomain) || email.endsWith(facultyDomain) || email === 'admin@svkm.ac.in';
};

/**
 * Get role from email
 */
const getRoleFromEmail = (email) => {
  const studentDomain = '@svkmmumbai.onmicrosoft.com';
  const facultyDomain = '@svkm.ac.in';

  if (email === 'admin@svkm.ac.in') {
    return 'admin';
  } else if (email.endsWith(studentDomain)) {
    return 'student';
  } else if (email.endsWith(facultyDomain)) {
    return 'faculty';
  }
  return null;
};

/**
 * Validate password strength
 */
const isStrongPassword = (password) => {
  return password && password.length >= 6;
};

/**
 * Validate required fields
 */
const validateRequiredFields = (data, requiredFields) => {
  const errors = [];
  
  requiredFields.forEach(field => {
    if (!data[field] || data[field].trim() === '') {
      errors.push(`${field} is required`);
    }
  });

  return errors;
};

/**
 * Validate date format
 */
const isValidDate = (dateString) => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date);
};

/**
 * Check if date is in future
 */
const isFutureDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date >= today;
};

/**
 * Validate signup data
 */
const validateSignup = (data) => {
  const { name, email, password, confirm_password } = data;

  // Check required fields
  if (!name || !email || !password || !confirm_password) {
    return { valid: false, error: 'All fields are required' };
  }

  // Validate email format
  if (!isValidEmail(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Validate SVKM email
  if (!isValidSVKMEmail(email)) {
    return { valid: false, error: 'Please use your official SVKM email' };
  }

  // Check password match
  if (password !== confirm_password) {
    return { valid: false, error: 'Passwords do not match' };
  }

  // Validate password strength
  if (!isStrongPassword(password)) {
    return { valid: false, error: 'Password must be at least 6 characters long' };
  }

  return { valid: true };
};

/**
 * Validate login data
 */
const validateLogin = (data) => {
  const { email, password } = data;

  if (!email || !password) {
    return { valid: false, error: 'Email and password are required' };
  }

  if (!isValidEmail(email)) {
    return { valid: false, error: 'Invalid email format' };
  }

  return { valid: true };
};

module.exports = {
  isValidEmail,
  isValidSVKMEmail,
  getRoleFromEmail,
  isStrongPassword,
  validateRequiredFields,
  isValidDate,
  isFutureDate,
  validateSignup,
  validateLogin
};
