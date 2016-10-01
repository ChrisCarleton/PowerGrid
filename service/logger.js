import bunyan from 'bunyan';
import config from './config';
import mkdirp from 'mkdirp';
import path from 'path';

let streams = [
	{ stream: process.stdout }
];

// This is mainly for testing... logs should be sent to stdout where possible.
if (config.logFile) {
	const logFilePath = path.dirname(config.logFile);
	mkdirp.sync(logFilePath, { mode: '0770' });

	streams = [{
		type: 'rotating-file',
		path: config.logFile
	}];
}

const logger = bunyan.createLogger({
	name: 'power-grid-logger',
	level: config.logLevel,
	streams: streams
});

export default logger;
