/** @format */

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const sessionRoutes = require('./routes/sessions');
const dotenv = require('dotenv'); // Import dotenv

dotenv.config(); // Load environment variables

const app = express();

// Connect to MongoDB
mongoose
	.connect('mongodb://localhost:27017/Ratham', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log('Connected to MongoDB: Ratham'))
	.catch((err) => console.error('Could not connect to MongoDB: Ratham', err));

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
