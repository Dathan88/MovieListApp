import { GET_MOVIES, ADD_MOVIE, DELETE_MOVIE } from './types';

export const getMovies = () => {
	return {
		type: GET_MOVIES,
	};
};

export const addMovie = movie => {
	return {
		type: ADD_MOVIE,
		payload: movie,
	};
};

export const deleteMovie = id => {
	return {
		type: DELETE_MOVIE,
		payload: id,
	};
};
