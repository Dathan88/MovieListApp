const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE SCHEMA
const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	register_date: {
		type: Date,
		default: Date.now,
	},
	movies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }],
});

module.exports = User = mongoose.model('User', UserSchema);
