import axios from 'axios';
import { GET_MOVIES, ADD_MOVIE, DELETE_MOVIE, MOVIES_LOADING } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';
export const getMovies = userId => dispatch => {
	dispatch(setMoviesLoading());
	axios
		.get(`/api/movies/${userId}`)
		.then(res => {
			dispatch({
				type: GET_MOVIES,
				payload: res.data,
			});
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const addMovie = (movie, userId) => (dispatch, getState) => {
	axios
		.post(`/api/movies/${userId}`, movie, tokenConfig(getState))
		.then(res => {
			dispatch({
				type: ADD_MOVIE,
				payload: res.data,
			});
		})
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const deleteMovie = (movie, userId) => (dispatch, getState) => {
	axios
		.delete(`/api/movies/${movie}/${userId}`, tokenConfig(getState))
		.then(res =>
			dispatch({
				type: DELETE_MOVIE,
				payload: movie,
			})
		)
		.catch(err =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const setMoviesLoading = () => {
	return {
		type: MOVIES_LOADING,
	};
};
