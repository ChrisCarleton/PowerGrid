import { ErrorIds, serverError, validationFailed } from './errors.controller';
import Joi from 'joi';
import User from '../data/user.model';

const createAccountValidation = Joi.object().keys({
	username: Joi.string().regex(/^[a-z0-9_\-\.]+$/i).max(60).required(),
	email: Joi.string().email().max(100).required(),
	displayName: Joi.string().max(100).required(),
	password: Joi.string().required()
});

export function createAccount(req, res) {
	const validation = Joi.validate(req.body, createAccountValidation);
	if (validation.error) {
		req.log.trace('Create account validation failed', validation);
		return validationFailed(res);
	}

	const userModel = new User({
		username: req.body.username,
		email: req.body.email,
		displayName: req.body.displayName
	});

	userModel.password = req.body.password;

	req.log.debug('Creating user account', req.body.username);

	userModel.save()
		.then(result => {
			req.log.debug('User account', req.body.username, 'created successfully.');
			res.json(result);
		})
		.catch(err => {
			req.log.error('Error creating user account', req.body.username, err );
			serverError(
				res,
				ErrorIds['err.server.database'],
				'Unable to save user account.',
				'The database could not be written to. Please try again later.');
		});
}

export function changePassword() {

}

export function deleteProfile() {

}

export function getProfile() {

}

export function findUserByName() {

}

export function login() {

}

export function logout() {

}

export function resetPassword() {

}

export function updateProfile() {

}
