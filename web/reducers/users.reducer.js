export default function(state = {}, action) {
	switch (action.type) {
		case 'SIGN_IN_USER':
			return action.user;

		case 'SIGN_OUT_USER':
			return null;

		default:
			return state;
	}
}
