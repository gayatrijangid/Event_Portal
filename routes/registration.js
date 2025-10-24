const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const db = require('../config/db');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '_' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'));
    }
  }
});

// Middleware to check if user is authenticated and is a student
const isStudent = (req, res, next) => {
  if (!req.session.user_id) {
    return res.status(401).json({ error: 'Unauthorized. Please login first' });
  }
  if (req.session.role !== 'student') {
    return res.status(403).json({ error: 'Access denied. Students only' });
  }
  next();
};

// Register for an event
router.post('/:eventId', isStudent, upload.single('proof'), async (req, res) => {
  try {
    const { eventId } = req.params;
    const email = req.session.email;
    const studentName = req.session.username;

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'Please upload a proof screenshot' });
    }

    // Check if event exists
    const [events] = await db.query('SELECT * FROM events WHERE id = ?', [eventId]);
    if (events.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    const event = events[0];

    // Check if deadline has passed
    const today = new Date().toISOString().split('T')[0];
    if (event.deadline < today) {
      return res.status(400).json({ error: 'Registration deadline has passed' });
    }

    // Check if already registered
    const [existing] = await db.query(
      'SELECT * FROM registration WHERE email = ? AND event_id = ?',
      [email, eventId]
    );
    if (existing.length > 0) {
      return res.status(400).json({ error: 'You are already registered for this event' });
    }

    // Insert registration
    const proofImagePath = 'uploads/' + req.file.filename;
    await db.query(
      'INSERT INTO registration (email, student_name, event_id, proof_image) VALUES (?, ?, ?, ?)',
      [email, studentName, eventId, proofImagePath]
    );

    res.status(201).json({
      success: true,
      message: 'Successfully registered for the event'
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Failed to register for event' });
  }
});

// Get student's registrations
router.get('/my/registrations', isStudent, async (req, res) => {
  try {
    const email = req.session.email;
    const [registrations] = await db.query(
      `SELECT r.*, e.title, e.description, e.event_date, e.deadline, e.link 
       FROM registration r 
       JOIN events e ON r.event_id = e.id 
       WHERE r.email = ? 
       ORDER BY r.registered_at DESC`,
      [email]
    );
    res.json({ success: true, registrations });
  } catch (error) {
    console.error('Get registrations error:', error);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

// Check if student is registered for a specific event
router.get('/check/:eventId', isStudent, async (req, res) => {
  try {
    const { eventId } = req.params;
    const email = req.session.email;
    
    const [registrations] = await db.query(
      'SELECT * FROM registration WHERE email = ? AND event_id = ?',
      [email, eventId]
    );
    
    res.json({
      success: true,
      isRegistered: registrations.length > 0
    });
  } catch (error) {
    console.error('Check registration error:', error);
    res.status(500).json({ error: 'Failed to check registration status' });
  }
});

// Get all registrations for an event (admin/faculty)
router.get('/event/:eventId', async (req, res) => {
  try {
    if (!req.session.user_id) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    if (req.session.role !== 'admin' && req.session.role !== 'faculty') {
      return res.status(403).json({ error: 'Access denied' });
    }

    const { eventId } = req.params;
    const [registrations] = await db.query(
      'SELECT * FROM registration WHERE event_id = ? ORDER BY registered_at DESC',
      [eventId]
    );
    
    res.json({ success: true, registrations });
  } catch (error) {
    console.error('Get event registrations error:', error);
    res.status(500).json({ error: 'Failed to fetch registrations' });
  }
});

module.exports = router;
