import config from '../config';
import GoogleStrategy from 'passport-google-oauth20';
import log from '../logger';
import passport from 'passport';
import User from '../data/user.model';
import url from 'url';

export default function(app) {
	if (!config.auth.providers.google.enabled) {
		log.debug('Authenticate With Google option is disabled because it has not yet been configured.');
		return;
	}

	const redirectUrl = '/auth/google/';
	const callbackUrl = redirectUrl + 'callback/';

	passport.use(
		new GoogleStrategy(
			Object.assign(
				{},
				config.auth.providers.google,
				{ callbackURL: url.resolve(config.hostname, callbackUrl) }
			),
			(accessToken, refreshToken, profile, done) => {
				User.findOrCreate(profile)
					.then(user => {
						done(null, user);
					})
					.catch(err => {
						done(err);
					});
			}));

	app.get(redirectUrl, passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.email'] }));
	app.get(callbackUrl, passport.authenticate('google'), () => {});


}
