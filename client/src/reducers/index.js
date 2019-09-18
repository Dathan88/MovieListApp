import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

export default combineReducers({
	movie: movieReducer,
	error: errorReducer,
	auth: authReducer,
});
