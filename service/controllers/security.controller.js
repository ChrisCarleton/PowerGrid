import { ErrorIds, notAuthorized, serverError } from './errors.controller';
import passport from 'passport';

export function authenticate(req, res, next) {
	passport.authenticate(
		'local',
		(err, user) => {
			if (err) {
				req.log.error('Authentication failed with error:', err);
				return serverError(
					res,
					ErrorIds['err.server.general'],
					'Unable to authenticate user account.',
					'A problem occurred while trying to authenticate the user.');
			}

			if (!user) {
				req.log.info('Authentication failed for user ', req.body.username);
				return notAuthorized(res, 'Invalid username or password.');
			}

			req.login(user, err => {
				if (err) {
					req.log.error('Failed to create session for user ', user.username, ':', err);
					return serverError(
						res,
						ErrorIds['err.server.session'],
						'Unable to establish session for user.',
						'A problem occurred while trying to log in the user. Please try again later.');
				}

				req.log.info('User', req.body.username, 'successfully authenticated.');
				next();
			});

		})(req, res, next);
}

export function requireUser(req, res, next) {
	if (!req.user) {
		req.log.debug('Sorry... no user.');
		return notAuthorized(res, 'User must be logged in to perform this action.');
	}

	next();
}
