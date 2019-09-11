const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE SCHEMA
const MovieSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

module.exports = Movie = mongoose.model('movie', MovieSchema);
