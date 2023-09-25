/** @format */

const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user'); // Adjust the path according to your project structure

const router = express.Router();

// Middleware to parse JSON requests
router.use(express.json());

// Login Route
router.post('/login', async (req, res) => {
	try {
		const { universityId, password } = req.body;
		if (!universityId || !password) {
			return res
				.status(400)
				.json({ error: 'University ID and password are required' });
		}

		const user = await User.findOne({ universityId });
		if (!user) {
			return res
				.status(401)
				.json({ error: 'Invalid university ID or password' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ error: 'Invalid university ID or password' });
		}

		const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
			expiresIn: '1h',
		});

		res.json({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Signup (Register) Route
router.post('/register', async (req, res) => {
	try {
		const { universityId, password } = req.body;
		if (!universityId || !password) {
			return res
				.status(400)
				.json({ error: 'University ID and password are required' });
		}

		const existingUser = await User.findOne({ universityId });
		if (existingUser)
			return res.status(400).json({ error: 'User already exists' });

		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			universityId,
			password: hashedPassword,
		});

		await user.save();

		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

router.post('/dean-signup', async (req, res) => {
	try {
		const { universityId, password } = req.body;
		if (!universityId || !password) {
			return res
				.status(400)
				.json({ error: 'University ID and password are required' });
		}

		// Check if the Dean already exists
		const existingDean = await User.findOne({ universityId });
		if (existingDean) {
			return res
				.status(400)
				.json({ error: 'Dean with this university ID already exists' });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new Dean user
		const dean = new User({
			universityId,
			password: hashedPassword,
		});

		await dean.save();

		// Generate a JWT token for Dean
		const deanToken = jwt.sign({ userId: dean._id }, process.env.JWT_SECRET, {
			expiresIn: '1h', // Set the token expiration time
		});

		res.json({ token: deanToken });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Dean Login Route
router.post('/dean-login', async (req, res) => {
	try {
		const { universityId, password } = req.body;
		if (!universityId || !password) {
			return res
				.status(400)
				.json({ error: 'University ID and password are required' });
		}

		// Find the Dean by universityId
		const dean = await User.findOne({ universityId });
		if (!dean) {
			return res
				.status(401)
				.json({ error: 'Invalid university ID or password' });
		}

		// Verify Dean's password
		const isPasswordValid = await bcrypt.compare(password, dean.password);
		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ error: 'Invalid university ID or password' });
		}

		// Generate a JWT token for Dean
		const deanToken = jwt.sign({ userId: dean._id }, process.env.JWT_SECRET, {
			expiresIn: '1h', // Set the token expiration time
		});

		res.json({ token: deanToken });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

// Student B Login Route
router.post('/student-b-login', async (req, res) => {
	try {
		const { universityId, password } = req.body;
		if (!universityId || !password) {
			return res
				.status(400)
				.json({ error: 'University ID and password are required' });
		}

		// Find Student B by universityId
		const studentB = await User.findOne({ universityId });
		if (!studentB) {
			return res
				.status(401)
				.json({ error: 'Invalid university ID or password' });
		}

		// Verify Student B's password
		const isPasswordValid = await bcrypt.compare(password, studentB.password);
		if (!isPasswordValid) {
			return res
				.status(401)
				.json({ error: 'Invalid university ID or password' });
		}

		// Generate a JWT token for Student B
		const studentBToken = jwt.sign(
			{ userId: studentB._id },
			process.env.JWT_SECRET,
			{
				expiresIn: '1h', // Set the token expiration time
			}
		);

		res.json({ token: studentBToken });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Internal Server Error' });
	}
});

module.exports = router;
