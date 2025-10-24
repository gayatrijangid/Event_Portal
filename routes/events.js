const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (!req.session.user_id) {
    return res.status(401).json({ error: 'Unauthorized. Please login first' });
  }
  next();
};

// Middleware to check if user is faculty
const isFaculty = (req, res, next) => {
  if (req.session.role !== 'faculty') {
    return res.status(403).json({ error: 'Access denied. Faculty only' });
  }
  next();
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.session.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin only' });
  }
  next();
};

// Get all events
router.get('/', async (req, res) => {
  try {
    const [events] = await db.query(
      'SELECT * FROM events ORDER BY event_date DESC'
    );
    res.json({ success: true, events });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// Get single event by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [events] = await db.query('SELECT * FROM events WHERE id = ?', [id]);
    
    if (events.length === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }
    
    res.json({ success: true, event: events[0] });
  } catch (error) {
    console.error('Get event error:', error);
    res.status(500).json({ error: 'Failed to fetch event' });
  }
});

// Add new event (faculty only)
router.post('/', isAuthenticated, isFaculty, async (req, res) => {
  try {
    const { name, description, date, deadline, link } = req.body;
    const faculty_id = req.session.user_id;

    // Validate input
    if (!name || !description || !date || !deadline || !link) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Insert event
    const [result] = await db.query(
      'INSERT INTO events (title, description, event_date, deadline, link, created_by) VALUES (?, ?, ?, ?, ?, ?)',
      [name, description, date, deadline, link, faculty_id]
    );

    res.status(201).json({
      success: true,
      message: 'Event added successfully',
      eventId: result.insertId
    });
  } catch (error) {
    console.error('Add event error:', error);
    res.status(500).json({ error: 'Failed to add event' });
  }
});

// Update event (faculty only)
router.put('/:id', isAuthenticated, isFaculty, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, event_date, deadline, link } = req.body;

    // Validate input
    if (!title || !description || !event_date || !deadline || !link) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const [result] = await db.query(
      'UPDATE events SET title = ?, description = ?, event_date = ?, deadline = ?, link = ? WHERE id = ?',
      [title, description, event_date, deadline, link, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({
      success: true,
      message: 'Event updated successfully'
    });
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

// Delete event (admin or faculty who created it)
router.delete('/:id', isAuthenticated, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.session.user_id;
    const userRole = req.session.role;

    // Check if user has permission (admin or event creator)
    if (userRole !== 'admin' && userRole !== 'faculty') {
      return res.status(403).json({ error: 'Access denied' });
    }

    // If faculty, check if they created this event
    if (userRole === 'faculty') {
      const [events] = await db.query('SELECT * FROM events WHERE id = ? AND created_by = ?', [id, userId]);
      if (events.length === 0) {
        return res.status(403).json({ error: 'You can only delete events you created' });
      }
    }

    // Delete related registrations first
    await db.query('DELETE FROM registration WHERE event_id = ?', [id]);

    // Delete event
    const [result] = await db.query('DELETE FROM events WHERE id = ?', [id]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({
      success: true,
      message: 'Event deleted successfully'
    });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// Get events created by logged-in faculty
router.get('/my/events', isAuthenticated, isFaculty, async (req, res) => {
  try {
    const faculty_id = req.session.user_id;
    const [events] = await db.query(
      'SELECT * FROM events WHERE created_by = ? ORDER BY event_date DESC',
      [faculty_id]
    );
    res.json({ success: true, events });
  } catch (error) {
    console.error('Get faculty events error:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

module.exports = router;
