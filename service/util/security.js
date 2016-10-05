import passport from 'passport';
import LocalStrategy from 'passport-local';
import log from '../logger';
import User from '../data/user.model';

export default function(app) {

	app.use(passport.initialize());
	app.use(passport.session());

	passport.use(
		new LocalStrategy((username, password, done) => {
			User.findByUsername(username)
				.then(user => {
					if (!user) {
						return done(null, false);
					}

					if (!user.validatePassword(password)) {
						return done(null, false);
					}

					done(null, user);
				})
				.catch(done);
		})
	);

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

}
