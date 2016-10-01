import config from '../service/config';
import clearDb from 'mocha-mongoose';

export default clearDb(config.database);
