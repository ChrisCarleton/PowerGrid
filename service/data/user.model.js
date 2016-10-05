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
	displayName: {
		type: String,
		required: true,
		maxlength: 100
	},
	email: {
		type: String,
		required: true,
		maxlength: 100,
		lowercase: true,
		match: /^.+@.+\..+$/,
		unique: true
	},
	passwordHash: {
		type: String,
		required: true
	},
	created: {
		type: Date,
		default: Date.now()
	}
});

UserSchema.methods.validatePassword = function(password) {
	return bcrypt.compareSync(password, this.passwordHash);
};

UserSchema.methods.toJSON = function() {
	return {
		username: this.username,
		email: this.email,
		displayName: this.displayName,
		memberSince: this.created
	};
};

UserSchema.virtual('password').set(function(password) {
	const salt = bcrypt.genSaltSync(8);
	const hash = bcrypt.hashSync(password, salt);
	this.passwordHash = hash;
});

UserSchema.statics.findByUsername = function(username) {
	return this.findOne({ username: username.toLowerCase() });
};

UserSchema.statics.findByEmail = function(email) {
	return this.findOne({ email: email.toLowerCase() });
};

const model = database.model('User', UserSchema);
export default model;
