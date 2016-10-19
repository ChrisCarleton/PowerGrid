import google from './google';
import passport from 'passport';
import local from './local';
import log from '../logger';
import User from '../data/user.model';

export default function(app) {
	app.use(passport.initialize());
	app.use(passport.session());

	passport.serializeUser((user, done) => {
		done(null, user.username);
	});

	passport.deserializeUser((username, done) => {
		log.debug('Deserializing user', username);
		User.findByUsername(username)
			.then(user => {
				done(null, user);
			})
			.catch(done);
	});

	local(app);

	google(app);
}
