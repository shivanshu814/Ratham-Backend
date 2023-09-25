/** @format */

const mongoose = require('mongoose');

const SessionSchema = new mongoose.Schema({
	slot: Date,
	studentId: mongoose.Types.ObjectId,
});

module.exports = mongoose.model('Session', SessionSchema);
