import config from './config';
import express from 'express';
import http from 'http';
import log from './logger';
import pug from 'pug';

const app = express();
const renderHomePage = pug.compileFile(__dirname + '/index.pug');
const isProduction = (config.env === 'production');

app.get('/', (req, res) => {
	res.send(renderHomePage({
		hostname: config.hostname,
		isProduction: isProduction
	}));
});

const server = http.createServer(app);
server.listen(config.port);
log.info('Application server started on port', config.port);
