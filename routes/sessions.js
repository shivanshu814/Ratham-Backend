/** @format */

const express = require('express');
const jwt = require('jsonwebtoken');
const Session = require('../models/session');
const User = require('../models/user');

const placeholderSessionId = 'placeholder_session_id';
const router = express.Router();

// Middleware to parse JSON requests
router.use(express.json());

// Middleware to verify token
router.use((req, res, next) => {
	const token = req.header('Authorization')?.split(' ')[1];
	if (!token)
		return res.status(401).json({ error: 'Access denied. No token provided.' });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(400).json({ error: 'Invalid token.' });
	}
});

// Route to get available sessions
router.get('/available', async (req, res) => {
	try {
		const sessions = await Session.find({ studentId: null });
		res.json(sessions);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Create a new session
router.post('/create', async (req, res) => {
	try {
		// Extract data for the new session from the request body
		const { slot } = req.body;

		// Create a new session document
		const session = new Session({
			slot,
			studentId: null, // Initially, no student is booked
		});

		// Save the session to the database
		await session.save();

		// Send a success response
		res.json({ message: 'Session created successfully', session });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Route to book a session
router.post('/book', async (req, res) => {
	try {
		// Extract sessionId from the request body
		const { sessionId } = req.body;

		// Check if sessionId is not provided or is a placeholder
		if (!sessionId || sessionId === placeholderSessionId) {
			return res.status(400).json({ error: 'Session ID is required' });
		}

		// Find the session by sessionId
		const session = await Session.findById(sessionId);

		// Check if the session exists
		if (!session) {
			return res.status(400).json({ error: 'Invalid session ID' });
		}

		// Check if the session is already booked
		if (session.studentId) {
			return res.status(400).json({ error: 'Session already booked' });
		}

		// Assuming you have user authentication in place,
		// you can access the user's ID using req.user.userId
		const user = await User.findById(req.user.userId);

		// Check if the user exists
		if (!user) {
			return res.status(400).json({ error: 'Invalid user ID' });
		}

		// Update the session with the user's ID as studentId
		session.studentId = user._id;
		await session.save();

		// Send a success response
		res.json({ message: 'Session booked successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Dean Views Pending Sessions Route
router.get('/pending-for-dean', async (req, res) => {
	try {
		// Verify Dean's JWT token
		const deanToken = req.header('Authorization').replace('Bearer ', '');
		const deanData = jwt.verify(deanToken, process.env.JWT_SECRET);

		// Find pending sessions for the Dean
		const pendingSessions = await Session.find({ studentId: deanData.userId });

		// You can format the response as needed, including student names and slot details
		res.json({ pendingSessions });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Dean Views Pending Sessions
router.get('/pending', async (req, res) => {
	try {
		// Ensure the user making the request is a Dean (You can implement this logic)
		if (!req.user.isDean) {
			return res.status(403).json({ error: 'Access denied. Not a Dean.' });
		}

		// Find all sessions where studentId is not assigned (i.e., pending sessions)
		const pendingSessions = await Session.find({ studentId: null });

		// Prepare the response with session details (you can customize this)
		const pendingSessionsInfo = pendingSessions.map((session) => {
			return {
				sessionId: session._id,
				slot: session.slot,
			};
		});

		res.json(pendingSessionsInfo);
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
