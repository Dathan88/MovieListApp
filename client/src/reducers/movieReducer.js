import uuid from 'uuid';
import { GET_MOVIES, ADD_MOVIE, DELETE_MOVIE } from '../actions/types';

const initialState = {
	movies: [
		{ id: uuid(), name: 'Godzilla' },
		{ id: uuid(), name: 'Peter Pan' },
		{ id: uuid(), name: 'Fight Club' },
	],
};

export default function(state = initialState, action) {
	switch (action.type) {
		case GET_MOVIES:
			return {
				...state,
			};
		case DELETE_MOVIE:
			// console.log(state);
			return {
				...state,
				movies: state.movies.filter(movie => movie.id !== action.payload),
			};
		default:
			return state;
	}
}
