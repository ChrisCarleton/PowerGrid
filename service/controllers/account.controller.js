import { ErrorIds, notAuthorized, serverError, validationFailed } from './errors.controller';
import Joi from 'joi';
import User from '../data/user.model';

const USERNAME_IN_USE = 'username-taken';
const EMAIL_IN_USE = 'email-taken';
// TODO: Make this a thing.
const PASSWORD_STRENGTH_VALIDATION = /^.*$/;

const createAccountValidation = Joi.object().keys({
	username: Joi.string().regex(/^[a-z0-9_\-\.]+$/i).max(60).required(),
	email: Joi.string().email().max(100).required(),
	displayName: Joi.string().max(100).required(),
	password: Joi.string().regex(PASSWORD_STRENGTH_VALIDATION).required()
});

const changePasswordValidation = Joi.object().keys({
	oldPassword: Joi.string().required(),
	newPassword: Joi.string().regex(PASSWORD_STRENGTH_VALIDATION).required()
});

const updateProfileValidation = Joi.object().keys({
	email: Joi.string().email().max(100).required(),
	displayName: Joi.string().max(100).required()
});

function findUserWithEmailUnlessMatch(email, match) {
	if (email.toLowerCase() === match.toLowerCase()) {
		return Promise.resolve(null);
	}

	return User.findByEmail(email);
}

export function createProfile(req, res) {
	const validation = Joi.validate(req.body, createAccountValidation);
	if (validation.error) {
		req.log.trace('Create account validation failed', validation);
		return validationFailed(res);
	}

	User.findByUsername(req.body.username)
		.then(takenAccount => {
			if (takenAccount) {
				throw USERNAME_IN_USE;
			}

			return User.findByEmail(req.body.email);
		})
		.then(takenEmail => {
			if (takenEmail) {
				throw EMAIL_IN_USE;
			}

			const userModel = new User({
				username: req.body.username,
				email: req.body.email,
				displayName: req.body.displayName
			});

			userModel.password = req.body.password;

			req.log.debug('Creating user account', req.body.username);

			return userModel.save();
		})
		.then(user => {
			req.log.info('User account', user.username, 'created successfully.');
			req.login(user, err => {
				if (err) {
					req.log.error('Failed to login user', user.username, 'after account creation:', err);
					return serverError(
						res,
						ErrorIds['err.server.session'],
						'Failed to establish session for new account.',
						'Your account was created successfully, but for some reason we could not log you in. ' +
							'Please try and log in with your username and password later.');
				}

				res.json(user.toJSON());
			});
		})
		.catch(err => {
			if (err === USERNAME_IN_USE) {
				return validationFailed(
					res,
					ErrorIds['err.validation.usernameTaken'],
					'User name is already taken.',
					'Please choose another user name and try again.');
			}

			if (err === EMAIL_IN_USE) {
				return validationFailed(
					res,
					ErrorIds['err.validation.emailTaken'],
					'E-mail is already taken.',
					'An account already exists with this e-mail address. Do you need to reset your password?');
			}

			req.log.error('Error creating user account', req.body.username, err );
			serverError(
				res,
				ErrorIds['err.server.database'],
				'Unable to save user account.',
				'The database could not be written to. Please try again later.');
		});
}

export function changePassword(req, res) {
	const validation = Joi.validate(req.body, changePasswordValidation);
	if (validation.error) {
		req.log.trace('Change password validation failed', validation);
		return validationFailed(res);
	}

	if (!req.profile.validatePassword(req.body.oldPassword)) {
		req.log.debug('Password change was rejected for user', req.profile.username, 'because old password was wrong.');
		return notAuthorized(
			res,
			'Unable to change password.',
			'Your old password was entered incorrectly. Please try re-typing it and then try again.');
	}

	req.profile.password = req.body.newPassword;
	req.profile.save()
		.then(() => {
			req.log.info('Password was changed for user', req.profile.username, 'by', req.user.username);
			res.json({ status: 'ok' });
		})
		.catch(err => {
			req.log.error('An error occurred while chaning password for user', req.profile.username, err);
			serverError(
				res,
				ErrorIds['err.server.general'],
				'Unable to save new password.',
				'An error occurred while trying to save the new password. Please try again later.');
		});
}

export function deleteProfile() {

}

export function getMyProfile(req, res) {
	res.json(req.user.toJSON());
}

export function getProfile(req, res) {
	res.json(req.profile.toJSON());
}

export function findUserByName(req, res, next, username) {
	User.findByUsername(username)
		.then(user => {
			req.profile = user;
			next();
		})
		.catch(err => {
			req.log.error('Error while looking up user profile', username, err);
			serverError(
				res,
				ErrorIds['err.server.general'],
				'Unable to look up user profile.',
				'An error occurred while attempting to look up user profile. Please try again later.');
		});
}

export function login(req, res) {
	res.json(req.user.toJSON());
}

export function logout(req, res) {
	req.logout();
	res.json({ status: 'ok' });
}

export function requireProfileAuth(req, res, next) {
	if (!req.user ||
		!req.profile ||
		req.user.username !== req.profile.username) {

		return notAuthorized(
			res,
			'User is not authorized to perform this action.');
	}

	next();
}

export function resetPassword() {

}

export function updateProfile(req, res) {
	const validation = Joi.validate(req.body, updateProfileValidation);
	if (validation.error) {
		req.log.trace('Update profile validation failed', validation);
		return validationFailed(res);
	}

	findUserWithEmailUnlessMatch(req.body.email, req.profile.email)
		.then(account => {
			if (account) {
				throw EMAIL_IN_USE;
			}

			req.profile.email = req.body.email;
			req.profile.displayName = req.body.displayName;
			return req.profile.save();
		})
		.then(profile => {
			res.json(profile);
		})
		.catch(err => {
			if (err === EMAIL_IN_USE) {
				return validationFailed(
					res,
					ErrorIds['err.validation.emailTaken'],
					'E-mail is already taken.',
					'An account already exists with this e-mail address. Do you have another account on this site?');
			}

			req.log.error(
				'An error occurred while attempting to update user profile for ',
				req.profile.username,
				err);

			serverError(
				res,
				ErrorIds['err.server.general'],
				'An error occurred while trying to save changes to the profile.',
				'Changes could not be saved at this time. Please try again later.');
		});
}
