/**
 * Response Handler Utility
 * Provides consistent response formatting across the application
 */

/**
 * Send success response
 */
const successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    ...data
  });
};

/**
 * Send error response
 */
const errorResponse = (res, message = 'An error occurred', statusCode = 500, error = null) => {
  const response = {
    success: false,
    error: message
  };

  if (error && process.env.NODE_ENV === 'development') {
    response.details = error;
  }

  return res.status(statusCode).json(response);
};

/**
 * Send validation error response
 */
const validationError = (res, errors) => {
  return res.status(400).json({
    success: false,
    error: 'Validation failed',
    errors
  });
};

/**
 * Send not found response
 */
const notFoundResponse = (res, resource = 'Resource') => {
  return res.status(404).json({
    success: false,
    error: `${resource} not found`
  });
};

/**
 * Send unauthorized response
 */
const unauthorizedResponse = (res, message = 'Unauthorized') => {
  return res.status(401).json({
    success: false,
    error: message
  });
};

/**
 * Send forbidden response
 */
const forbiddenResponse = (res, message = 'Access denied') => {
  return res.status(403).json({
    success: false,
    error: message
  });
};

module.exports = {
  successResponse,
  errorResponse,
  validationError,
  notFoundResponse,
  unauthorizedResponse,
  forbiddenResponse
};
