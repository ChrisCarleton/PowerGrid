export function signInUser(user) {
	return {
		type: 'SIGN_IN_USER',
		user: user
	};
}

export function signOutUser() {
	return {
		type: 'SIGN_OUT_USER'
	};
}
