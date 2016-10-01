const config = {
	env: process.env.NODE_ENV || 'development',
	hostname: process.env.POWERGRID_HOSTNAME || 'localhost',
	port: process.env.POWERGRID_PORT || 28988,

	logLevel: process.env.POWERGRID_LOG_LEVEL || 'debug',
	logFile: process.env.POWERGRID_LOG_FILE
};

config.database = process.env.POWERGRID_DATABASE || `mongodb://localhost:27017/powergrid_${config.env}`;

export default config;
