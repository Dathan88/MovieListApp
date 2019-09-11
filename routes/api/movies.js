const express = require('express');
const router = express.Router();

// ITEM MODEL
const Movie = require('../../models/Movie');

// @route GET api/movies
// @desc Get All movies
// @access Public
router.get('/', (req, res) => {
	Movie.find()
		.sort({ date: -1 })
		.then(movies => res.json(movies))
		.catch(err => console.log(err));
});

// @route POST api/movies
// @desc Create a Movie
// @access Public
router.post('/', (req, res) => {
	const newMovie = new Movie({
		name: req.body.name,
	});

	newMovie.save().then(movie => res.json(movie));
});

// @route DELETE api/movies/:id
// @desc Delete a Movie
// @access Public
router.delete('/:id', (req, res) => {
	Movie.findById(req.params.id).then(movie =>
		movie
			.remove()
			.then(() => res.json({ success: true }))
			.catch(err => res.status(404).json({ success: false }))
	);
});

module.exports = router;
