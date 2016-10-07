import { combineReducers } from 'redux';
import flashMessage from './flash-message.reducer';
import user from './users.reducer';

const reducer = combineReducers({
	user,
	flashMessage
});

export default reducer;
