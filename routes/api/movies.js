const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// MODELS
const { User, Movie } = require('../../models/User');

// @route GET api/movies
// @desc Get All movies
// @access Public
router.get('/:userId', (req, res) => {
	User.findById(req.params.userId)
		.then(user => {
			res.json(user.movieList);
		})
		.catch(err => console.log(err));
});

// @route POST api/movies
// @desc Create a Movie
// @access Private
router.post('/:userId', auth, (req, res) => {
	User.findById(req.params.userId)
		.then(user => {
			const newMovie = new Movie({
				poster: req.body.poster,
				title: req.body.title,
				overview: req.body.overview,
				releaseDate: req.body.releaseDate,
			});

			user.movieList.push(newMovie);
			user.save().then(res.json(newMovie));
		})
		.catch(err => console.log(err));
});

// @route DELETE api/movies/:id
// @desc Delete a Movie
// @access Private
router.delete('/:id/:userId', auth, (req, res) => {
	User.findById(req.params.userId)
		.then(user => {
			user.movieList.id(req.params.id).remove();
			user
				.save()
				.then(() => res.json({ success: true }))
				.catch(err => res.status(404).json({ success: false }));
		})
		.catch(err => console.log(err));
});

module.exports = router;
