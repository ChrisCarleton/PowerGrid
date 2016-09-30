import config from './config';
import database from './data/database';
import express from 'express';
import expressLogger from 'express-bunyan-logger';
import glob from 'glob';
import http from 'http';
import log from './logger';
import path from 'path';
import pug from 'pug';

const app = express();
const renderHomePage = pug.compileFile(__dirname + '/index.pug');
const isProduction = (config.env === 'production');

log.debug('Connecting to MongoDB at', config.database);
database.connect(config.database);

app.use(expressLogger({
	logger: log,
	excludes: [ 'referer', 'user-agent', 'body', 'short-body', 'response-hrtime', 'req', 'res', 'res-headers' ]
}));

app.use('/public', express.static(path.join(__dirname, '..', 'public')));

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
