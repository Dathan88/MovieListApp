const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE SCHEMA
const MovieSchema = new Schema({
	poster: {
		type: String,
	},
	title: {
		type: String,
		required: true,
	},
	overview: {
		type: String,
		required: true,
	},
	releaseDate: {
		type: Date,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Movie = mongoose.model('Movie', MovieSchema);
