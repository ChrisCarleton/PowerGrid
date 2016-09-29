import bunyan from 'bunyan';
import config from './config';
import mkdirp from 'mkdirp';
import path from 'path';

const streams = [
	{ stream: process.stdout }
];

if (config.logFile) {
	const logFilePath = path.dirname(config.logFile);
	mkdirp.sync(logFilePath, { mode: '0770' });

	streams.push({
		type: 'rotating-file',
		path: config.logFile
	});
}

const logger = bunyan.createLogger({
	name: 'power-grid-logger',
	level: config.logLevel,
	streams: streams
});

export default logger;
