const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// CREATE SCHEMA'S
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
	movieList: [MovieSchema],
});

const User = mongoose.model('User', UserSchema);
const Movie = mongoose.model('Movie', MovieSchema);

module.exports = {
	User,
	Movie,
};
