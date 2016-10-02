import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../data/user.model';

export default function(app) {

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

	passport.deserializeUser((id, done) => {
		User.findByUsername(id)
			.then(user => {
				done(null, user);
			})
			.catch(done);
	});

	app.use(passport.initialize());
	app.use(passport.session());

}
