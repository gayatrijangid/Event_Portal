/**
 * Authentication & Authorization Middleware
 * Handles user authentication and role-based access control
 */

/**
 * Check if user is authenticated
 */
const isAuthenticated = (req, res, next) => {
  if (!req.session.user_id) {
    return res.status(401).json({ 
      error: 'Unauthorized. Please login first' 
    });
  }
  next();
};

/**
 * Check if user has specific role
 */
const requireRole = (role) => {
  return (req, res, next) => {
    if (req.session.role !== role) {
      return res.status(403).json({ 
        error: `Access denied. ${role.charAt(0).toUpperCase() + role.slice(1)} only` 
      });
    }
    next();
  };
};

/**
 * Check if user is student
 */
const isStudent = (req, res, next) => {
  if (!req.session.user_id) {
    return res.status(401).json({ 
      error: 'Unauthorized. Please login first' 
    });
  }
  if (req.session.role !== 'student') {
    return res.status(403).json({ 
      error: 'Access denied. Students only' 
    });
  }
  next();
};

/**
 * Check if user is faculty
 */
const isFaculty = (req, res, next) => {
  if (!req.session.user_id) {
    return res.status(401).json({ 
      error: 'Unauthorized. Please login first' 
    });
  }
  if (req.session.role !== 'faculty') {
    return res.status(403).json({ 
      error: 'Access denied. Faculty only' 
    });
  }
  next();
};

/**
 * Check if user is admin
 */
const isAdmin = (req, res, next) => {
  if (!req.session.user_id) {
    return res.status(401).json({ 
      error: 'Unauthorized. Please login first' 
    });
  }
  if (req.session.role !== 'admin') {
    return res.status(403).json({ 
      error: 'Access denied. Admin only' 
    });
  }
  next();
};

/**
 * Check if user is admin or faculty
 */
const isAdminOrFaculty = (req, res, next) => {
  if (!req.session.user_id) {
    return res.status(401).json({ 
      error: 'Unauthorized. Please login first' 
    });
  }
  if (req.session.role !== 'admin' && req.session.role !== 'faculty') {
    return res.status(403).json({ 
      error: 'Access denied. Admin or Faculty only' 
    });
  }
  next();
};

module.exports = {
  isAuthenticated,
  requireRole,
  isStudent,
  isFaculty,
  isAdmin,
  isAdminOrFaculty
};
