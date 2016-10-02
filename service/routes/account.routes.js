import {
	changePassword,
	createAccount,
	deleteAccount,
	getProfile,
	findUserByName,
	updateProfile,
	login,
	logout,
	resetPassword
} from '../controllers/account.controller';

const BASE_ROUTE = '/api/1.0/users/';
const BASE_ROUTE_WITH_ID = BASE_ROUTE + ':username/';

module.exports = app => {

	app.post(BASE_ROUTE, createAccount);
	app.get(BASE_ROUTE_WITH_ID, getProfile);
	app.delete(BASE_ROUTE_WITH_ID, deleteProfile);
	app.put(BASE_ROUTE_WITH_ID, updateProfile);
	app.put(BASE_ROUTE_WITH_ID + 'password/change/', changePassword);
	app.put(BASE_ROUTE_WITH_ID + 'password/reset/', resetPassword);

	app.post(BASE_ROUTE + 'login/', login);
	app.post(BASE_ROUTE + 'logout/', logout);

	app.param('username', findUserByName);

};
