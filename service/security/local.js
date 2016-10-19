import LocalStrategy from 'passport-local';
import passport from 'passport';
import User from '../data/user.model';

export default function() {
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
}
