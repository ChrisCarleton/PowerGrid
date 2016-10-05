import { combineReducers } from 'redux';
import user from './users.reducer';

const reducer = combineReducers({
	user
});

export default reducer;
