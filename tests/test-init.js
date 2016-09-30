import config from '../service/config';
import mochaMongoose from 'mocha-mongoose';

mochaMongoose(config.database);
