import keymirror from 'keymirror';

export const ErrorIds = keymirror({
	'err.notAuthorized': null,
	'err.validation': null,
	'err.validation.usernameTaken': null,
	'err.validation.emailTaken': null,

	'err.server.database': null,
	'err.server.general': null,
	'err.server.session': null
});

export function notAuthorized(res, title, description) {
	res.status(401).json({
		errorId: 'err.notAuthorized',
		title: title,
		description: description
	});
}

export function serverError(res, id, title, description) {
	res.status(500).json({
		errorId: id,
		title: title,
		description: description
	});
}

export function validationFailed(
	res,
	id = ErrorIds['err.validation'],
	title = 'Validation failed',
	description = 'The request input was not valid. Please check your request and try again.') {

	res.status(400).json({
		errorId: id,
		title: title,
		description: description
	});
}

