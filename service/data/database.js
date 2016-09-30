import bluebird from 'bluebird';
import mongoose from 'mongoose';

mongoose.Promise = bluebird;

export default mongoose;
