import { ErrorIds, notAuthorized, serverError } from './errors.controller';
import passport from 'passport';

export function authenticate(req, res, next) {
	passport.authenticate(
		'local',
		(err, user) => {
			if (err) {
				req.log.error('Authentication failed:', err);
				return serverError(
					ErrorIds['err.server.general'],
					'Unable to authenticate user account.',
					'A problem occurred while trying to authenticate the user.');
			}

			if (!user) {
				req.log.info('Authentication failed for user ', req.body.username);
				return notAuthorized(res, 'Invalid username or password.');
			}

			req.log.info('User', req.body.username, 'successfully authenticated.');
			req.user = user;
			next();

		})(req, res, next);
}
