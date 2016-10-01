import { expect } from 'chai';
import clearDb from '../clear-db';
import User from '../../service/data/user.model';

const PASSWORD = 'mY_s3crt!';
const PASSWORD_HASH = '$2a$08$4HG4Ojk1swW35bcExhcLGeGbKxk.PzwgrPP5Tmk419.i5AJ4HAUva';

function verifyValidation(user, done, failureMessage) {
	new User(user).save()
		.then(() => done(failureMessage))
		.catch(err => {
			expect(err.name).to.equal('ValidationError');
			done();
		});
}

describe('User data model', () => {

	var user = {};
	beforeEach(done => {
		user = {
			username: 'mike_smith',
			email: 'mike@yahoo.com',
			passwordHash: PASSWORD_HASH,
			displayName: 'Mike Smith'
		};

		clearDb(done);
	});
	
	describe('validation', () => {
		it('will save valid users', done => {
			const model = new User(user);
			model.save()
				.then(result => {
					expect(result._id).to.exist;
					expect(result.username).to.equal(user.username);
					expect(result.email).to.equal(user.email);
					expect(result.passwordHash).to.equal(user.passwordHash);
					expect(result.displayName).to.equal(user.displayName);
					expect(result.created).to.exist;

					done();
				})
				.catch(done);
		});

		it('will fail if username is not provided', done => {
			user.username = undefined;
			verifyValidation(user, done, 'Username was not provided.');
		});

		it('will fail if username contains illegal characters', done => {
			user.username = 'ill eg@l char*cters';
			verifyValidation(user, done, 'Username contained illegal characters');
		});

		it('will fail if username is too long', done => {
			user.username = 'usernametoolongusernametoolongusernametoolongusernametoolongusernametoolong';
			verifyValidation(user, done, 'Username was too long');
		});

		it('will fail if username is taken', done => {
			const model = new User(user);
			model.save()
				.then(() => {
					user.email = 'different@gmail.com';
					const secondModel = new User(user);
					return secondModel.save()
				})
				.then(() => {
					done('Duplicate username was saved.');
				})
				.catch(err => {
					expect(err.message).to.match(/^E11000.*/);
					done();
				});
		});

		it('will fail if email is not provided', done => {
			user.email = undefined;
			verifyValidation(user, done, 'E-mail was not provided.');
		});

		it('will fail if email is not valid', done => {
			user.email = 'not an e-mail address';
			verifyValidation(user, done, 'E-mail was invalid');
		});

		it('will fail if e-mail address is too long', done => {
			user.email
				= 'emailaddressiswaytoolongemailaddressiswaytoolongemailaddressiswaytoolongemailaddressiswaytoolongemailaddressiswaytoolong@toolong.org';
			verifyValidation(user, done, 'E-mail was too long');
		});

		it('will fail if e-mail is taken', done => {
			const model = new User(user);
			model.save()
				.then(() => {
					user.username = 'DifferentUser';
					const secondModel = new User(user);
					return secondModel.save()
				})
				.then(() => {
					done('Duplicate e-mail was saved.');
				})
				.catch(err => {
					expect(err.message).to.match(/^E11000.*/);
					done();
				});
		});

		it('will fail if display name is not provided', done => {
			user.displayName = undefined;
			verifyValidation(user, done, 'Display name was not provided');
		});

		it('will fail if display name is too long', done => {
			user.displayName
				= 'This name is way too long to be a useful display name.  Seriously, it needs to be shorter cuz  it\'s just too long.';
			verifyValidation(user, done, 'Display name was too long');
		});

		it('will fail if passwordHash is not provided', done => {
			user.passwordHash = undefined;
			verifyValidation(user, done, 'Password hash was not provided');
		});
	});

	describe('extension methods', () => {
		it('will validate correct password', () => {
			const model = new User(user);
			expect(model.validatePassword(PASSWORD)).to.be.true;
		});

		it('will not validate incorrect password', () => {
			const model = new User(user);
			expect(model.validatePassword('!nc0rr3cT-')).to.be.false;
		});

		it('will hash the password when the virtual property is set', () => {
			const newPassword = '*Fr3SH-P@zzwrd!';
			const model = new User(user);
			model.password = newPassword;

			expect(model.validatePassword(newPassword)).to.be.true;
		});

		it('will return a user when findByUsername is invoked with a valid username', done => {
			const model = new User(user);
			let savedUser;

			model
				.save()
				.then(result => {
					expect(result).to.exist;
					savedUser = result;
					return User.findByUsername(user.username);
				})
				.then(result => {
					expect(result.username).to.equal(savedUser.username);
					expect(result.email).to.equal(savedUser.email);
					expect(result.passwordHash).to.equal(savedUser.passwordHash);
					expect(result.displayName).to.equal(savedUser.displayName);
					done();
				})
				.catch(done);
		});

		it('will return null when findByUsername is invoked with a non-existent e-mail', done => {
			User.findByUsername('not_a_real_user')
				.then(result => {
					expect(result).to.be.null;
					done();
				})
				.catch(done);
		});

		it('will return a user when findByEmail is invoked with a valid email', done => {
			const model = new User(user);
			let savedUser;

			model
				.save()
				.then(result => {
					expect(result).to.exist;
					savedUser = result;
					return User.findByEmail(user.email);
				})
				.then(result => {
					expect(result.username).to.equal(savedUser.username);
					expect(result.email).to.equal(savedUser.email);
					expect(result.passwordHash).to.equal(savedUser.passwordHash);
					expect(result.displayName).to.equal(savedUser.displayName);
					done();					
				})
				.catch(done);
		});

		it('will return null when findByEmail is invoked with a non-existent e-mail', done => {
			User.findByEmail('made_up@derp.com')
				.then(result => {
					expect(result).to.be.null;
					done();
				})
				.catch(done);
		});
	});
});
