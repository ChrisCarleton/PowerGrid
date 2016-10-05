import { authenticate } from '../controllers/security.controller';
import {
	changePassword,
	createProfile,
	deleteProfile,
	getMyProfile,
	getProfile,
	findUserByName,
	updateProfile,
	login,
	logout,
	requireProfileAuth,
	resetPassword
} from '../controllers/account.controller';
import { requireUser } from '../controllers/security.controller';

const USERS_ROUTE = '/api/1.0/users/';
const USER_ROUTE = USERS_ROUTE + ':username/';
const ACCOUNT_ROUTE = '/api/1.0/account/';

module.exports = app => {

	app.get(USER_ROUTE, requireProfileAuth, getProfile);
	app.post(USERS_ROUTE, createProfile);
	app.put(USER_ROUTE, requireProfileAuth, updateProfile);
	app.delete(USER_ROUTE, deleteProfile);
	app.put(USER_ROUTE + 'password/', requireProfileAuth, changePassword);

	app.get(ACCOUNT_ROUTE + 'me/', requireUser, getMyProfile);
	app.post(ACCOUNT_ROUTE + 'login/', authenticate, login);
	app.post(ACCOUNT_ROUTE + 'logout/', logout);
	app.post(ACCOUNT_ROUTE + 'resetPassword/', resetPassword);

	app.param('username', findUserByName);

};
