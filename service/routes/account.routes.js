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
	resetPassword
} from '../controllers/account.controller';

const USERS_ROUTE = '/api/1.0/users/';
const USER_ROUTE = USERS_ROUTE + ':username/';
const ACCOUNT_ROUTE = '/api/1.0/account/';

module.exports = app => {

	app.get(USER_ROUTE, getProfile);
	app.post(USERS_ROUTE, createProfile);
	app.put(USER_ROUTE, updateProfile);
	app.delete(USER_ROUTE, deleteProfile);
	app.put(USER_ROUTE + 'password/', changePassword);

	app.get(ACCOUNT_ROUTE + 'me/', getMyProfile);
	app.post(ACCOUNT_ROUTE + 'login/', authenticate, login);
	app.post(ACCOUNT_ROUTE + 'logout/', logout);
	app.post(ACCOUNT_ROUTE + 'resetPassword/', resetPassword);

	app.param('username', findUserByName);

};
