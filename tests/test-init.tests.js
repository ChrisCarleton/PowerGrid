import config from '../service/config';
import database from '../service/data/database';

let server;

before(() => {
	// Start the app server.
	server = require('../service/server');
});

after(() => {
	// Close connections.
	server.connection.close();
	database.connection.close();
});
