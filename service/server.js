import bodyParser from 'body-parser';
import config from './config';
import database from './data/database';
import express from 'express';
import expressLogger from 'express-bunyan-logger';
import glob from 'glob';
import http from 'http';
import log from './logger';
import connectMongo from 'connect-mongo';
import path from 'path';
import pug from 'pug';
import security from './util/security';
import session from 'express-session';
import uuid from 'uuid';

const app = express();
const renderHomePage = pug.compileFile(__dirname + '/index.pug');
const isProduction = (config.env === 'production');

const MongoStore = connectMongo(session);

log.debug('Connecting to MongoDB at', config.database);
database.connect(config.database);

app.use(session({
	cookie: {
		maxAge: 259200000	// 3 Days
		// secure: true
	},
	genid: () => { return uuid.v4(); },
	resave: false,
	saveUninitialized: false,
	secret: config.sessionSecret,
	store: new MongoStore({
		mongooseConnection: database.connection,
		ttl: 259200
	})
}));
app.use(bodyParser.json({ inflate: true }));
security(app);

app.use(expressLogger({
	logger: log,
	excludes: [ 'referer', 'user-agent', 'body', 'short-body', 'response-hrtime', 'req', 'res', 'res-headers' ]
}));

app.use('/public', express.static(path.join(__dirname, '../public')));

const routeLoaders = glob.sync(path.join(__dirname, 'routes') + '**/*.routes.js');
routeLoaders.forEach(routeLoader => {
	log.debug('Loading route loader:', routeLoader);
	require(routeLoader)(app);
});

app.get('/', (req, res) => {
	res.send(renderHomePage({
		hostname: config.hostname,
		isProduction: isProduction
	}));
});

const server = http.createServer(app);
server.listen(config.port);
log.info('Application server started on port', config.port);

process.on('uncaughtException', err => {
	log.fatal('Uncaught exception:', err);
});

module.exports = {
	app: app,
	connection: server
};
