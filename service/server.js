import config from './config';
import express from 'express';
import expressLogger from 'express-bunyan-logger';
import http from 'http';
import log from './logger';
import pug from 'pug';

const app = express();
const renderHomePage = pug.compileFile(__dirname + '/index.pug');
const isProduction = (config.env === 'production');

app.use(expressLogger({
	logger: log,
	excludes: [ 'referer', 'user-agent', 'body', 'short-body', 'response-hrtime', 'req', 'res', 'res-headers' ]
}));

app.get('/', (req, res) => {
	res.send(renderHomePage({
		hostname: config.hostname,
		isProduction: isProduction
	}));
});

const server = http.createServer(app);
server.listen(config.port);
log.info('Application server started on port', config.port);
