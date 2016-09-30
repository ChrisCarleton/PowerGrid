import bcrypt from 'bcrypt';
import database from './database';

const UserSchema = new database.Schema({
	username: {
		type: String,
		required: true,
		lowercase: true,
		maxlength: 60,
		match: /^[a-z0-9_\-\.]+$/i,
		unique: true
	},
	email: {
		type: String,
		required: true,
		lowercase: true,
		maxlength: 150,
		match: /^.+@.+\..+$/,
		unique: true
	},
	passwordHash: {
		type: String,
		required: true
	},
	displayName: {
		type: String,
		required: true,
		maxlength: 60
	},
	created: {
		type: Date,
		default: Date.now()
	}
});

UserSchema.statics.findByUsername = function(username) {
	return this.model.findOne({ username: username.toLowerCase() });
};

UserSchema.statics.findByEmail = function(email) {
	return this.model.findOne({ email: email.toLowerCase() });
};

UserSchema.virtual('password').set(function(password) {
	const salt = bcrypt.genSaltSync(8);
	const hash = bcrypt.hashSync(password, salt);
	this.passwordHash = hash;
});

UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password, this.passwordHash);
};

export default database.model('User', UserSchema);
