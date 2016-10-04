import { app } from '../../service/server';
import database from '../../service/data/database';
import { expect } from 'chai';
import Promise from 'bluebird';
import supertest from 'supertest-as-promised';
import sinon from 'sinon';
import User from '../../service/data/user.model';

describe('Account controller', () => {

	let user, request;

	beforeEach(() => {
		user = {
			username: 'bill.smiley',
			email: 'bill@company.com',
			displayName: 'I am Bill',
			password: '@dkfo2DF33'
		};

		request = supertest.agent(app);
	});

	describe('create account method', () => {

		it('will save the new account if successful', done => {
			request
				.post('/api/1.0/users/')
				.send(user)
				.expect(200)
				.then(res => {
					return User.findByUsername(user.username);
				})
				.then(result => {
					expect(result).to.exist;
					expect(result.username).to.equal(user.username);
					expect(result.email).to.equal(user.email);
					expect(result.displayName).to.equal(user.displayName);
					expect(result.validatePassword(user.password)).to.be.true;

					done();
				})
				.catch(done);
		});

		it('will log user in if successful', done => {
			request
				.post('/api/1.0/users/')
				.send(user)
				.expect(200)
				.then(() => {
					return request
						.get('/api/1.0/account/me/')
						.expect(200);
				})
				.then(res => {
					expect(res.body.username).to.equal(user.username);
					expect(res.body.email).to.equal(user.email);
					expect(res.body.displayName).to.equal(user.displayName);
					expect(res.body.memberSince).to.exist;
					done();
				})
				.catch(done);
		});

		it('will return a 400 error if validation fails', done => {
			user.email = 'this is not valid';
			request
				.post('/api/1.0/users/')
				.send(user)
				.expect(400)
				.then(res => {
					expect(res.body.errorId).to.equal('err.validation');
					done();					
				})
				.catch(done);
		});

		it('will return a 400 if username is taken', done => {
			new User(user)
				.save()
				.then(() => {
					user.email = 'something@different.ca';
					return request
						.post('/api/1.0/users/')
						.send(user)
						.expect(400);
				})
				.then(res => {
					expect(res.body.errorId).to.equal('err.validation.usernameTaken');
					done();
				})
				.catch(done);
		});

		it('will return a 400 if e-mail is taken', done => {
			new User(user)
				.save()
				.then(() => {
					user.username = 'SomeoneElse';
					return request
						.post('/api/1.0/users/')
						.send(user)
						.expect(400);
				})
				.then(res => {
					expect(res.body.errorId).to.equal('err.validation.emailTaken');
					done();
				})
				.catch(done);
		});

		// it('will return 500 error if database request fails', done => {
		// 	const stub = sinon
		// 		.stub(User.prototype, 'save')
		// 		.returns(Promise.reject('fail!!'));

		// 	request(app)
		// 		.post('/api/1.0/users/')
		// 		.send(user)
		// 		.expect(500)
		// 		.end((err, res) => {
		// 			stub.restore();
		// 			if (err) return done(err);
		// 			expect(res.body.errorId).to.equal('err.server.database');
		// 			done();
		// 		});
		// });

	});

	describe('login method', () => {

		beforeEach(done => {
			new User(user)
				.save()
				.then(() => done())
				.catch(done);
		});

		it('returns 200 on successful login', done => {
			request
				.post('/api/1.0/account/login')
				.send({ username: user.username, password: user.password })
				.expect(200)
				.then(res => {
					expect(res.body.username).to.equal(user.username);
					expect(res.body.email).to.equal(user.email);
					expect(res.body.displayName).to.equal(user.displayName);
					expect(res.body.memberSince).to.exist;
					done();
				})
				.catch(done);
		});

		it('returns 401 if password is invalid', done => {
			request
				.post('/api/1.0/account/login')
				.send({ username: user.username, password: 'wrongpassword' })
				.expect(401)
				.then(res => {
					expect(res.body.errorId).to.equal('err.notAuthorized');
					done();					
				})
				.catch(done);
		});

		it('returns 401 if username does not exist', done => {
			request
				.post('/api/1.0/account/login')
				.send({ username: 'jim_whatever', password: user.password })
				.expect(401)
				.then(res => {
					expect(res.body.errorId).to.equal('err.notAuthorized');
					done();					
				})
				.catch(done);
		});

		it('returns 401 if request is invalid', done => {
			request
				.post('/api/1.0/account/login')
				.send({ uselessKey: 'lol' })
				.expect(401)
				.then(() => {
					done();
				})
				.catch(done);
		});
	});

	describe('logout method', () => {

		it('will end a session', done => {
			new User(user)
				.save()
				.then(() => {
					return request
						.post('/api/1.0/account/login/')
						.send({ username: user.username, password: user.password })
						.expect(200);
				})
				.then(() => {
					return request
						.get('/api/1.0/account/me/')
						.expect(200);
				})
				.then(() => {
					return request
						.post('/api/1.0/account/logout/')
						.expect(200);
				})
				.then(() => {
					return request
						.get('/api/1.0/account/me/')
						.expect(401);					
				})
				.then(() => done())
				.catch(done);
		});

		it('will still return 200 if user is not logged in', done => {
			request
				.post('/api/1.0/account/logout')
				.expect(200)
				.then(() => done())
				.catch(done);
		});

	});

	describe('delete method', () => {

		beforeEach(done => {
			new User(user)
				.save()
				.then(() => done())
				.catch(done);
		});

		it('will succeed if user is authorized', () => {

		});

		it('will fail if user is not owner of hte profile', () => {

		});

		it('will fail if user is not authenticated', () => {

		});

		it('will close the session and log user out', () => {

		});

		it('will fail if database call fails', () => {

		});
	});

	describe('my account method', () => {

		it('will succeed if user is authenticated', done => {
			new User(user)
				.save()
				.then(() => {
					return request
						.post('/api/1.0/account/login')
						.send({ username: user.username, password: user.password })
						.expect(200);
				})
				.then(() => {
					return request
						.get('/api/1.0/account/me')
						.expect(200);
				})
				.then(res => {
					expect(res.body.username).to.equal(user.username);
					expect(res.body.email).to.equal(user.email);
					expect(res.body.displayName).to.equal(user.displayName);
					expect(res.body.memberSince).to.exist;
					done();					
				})
				.catch(done);
		});

		it('will return 401 if user is not authenticated', done => {
			request
				.get('/api/1.0/account/me')
				.expect(401)
				.then(() => done())
				.catch(done);
		});
	});

	describe('change password method', () => {

		const newPassword = 'n3w^p@ZZwrd.';
		let passwordRoute;

		beforeEach(done => {
			new User(user)
				.save()
				.then(() => done())
				.catch(done);

			passwordRoute = `/api/1.0/users/${user.username}/password/`;
		});

		it('will change the password if successful', done => {
			request
				.post('/api/1.0/account/login')
				.send({ username: user.username, password: user.password })
				.expect(200)
				.then(() => {
					return request
						.put(passwordRoute)
						.send({ oldPassword: user.password, newPassword: newPassword })
						.expect(200)
				})
				.then(() => {
					return User.findByUsername(user.username);
				})
				.then(user => {
					expect(user.validatePassword(newPassword)).to.be.true;
					done();
				})
				.catch(done);
		});

		it('will return 401 if user is not signed in', done => {
			request
				.put(passwordRoute)
				.send({ oldPassword: user.password, newPassword: newPassword })
				.expect(401)
				.then(res => {
					expect(res.body.errorId).to.equal('err.notAuthorized');
					done();
				})
				.catch(done);
		});

		it('will return 401 if user is not the owner of the profile', done => {
			const otherUser = {
				username: 'innocent.other.guy',
				displayName: 'Some Dude',
				password: 'Pls.D0nt-Gu33ss.meh',
				email: 'random_bot4235@gmail.com'
			};

			new User(otherUser)
				.save()
				.then(() => {
					return request
						.post('/api/1.0/account/login')
						.send({ username: user.username, password: user.password })
						.expect(200);
				})
				.then(() => {
					return request
						.put(`/api/1.0/users/${otherUser.username}/password`)
						.send({ oldPassword: otherUser.password, newPassword: '133t.H@x0rz' })
						.expect(401)
				})
				.then(res => {
					expect(res.body.errorId).to.equal('err.notAuthorized');
					done();
				})
				.catch(done);
		});

		it('will return 401 if old password is incorrect', done => {
			request
				.post('/api/1.0/account/login')
				.send({ username: user.username, password: user.password })
				.expect(200)
				.then(() => {
					return request
						.put(passwordRoute)
						.send({ oldPassword: 'not.c0RRect', newPassword: '133t.H@x0rz' })
						.expect(401);
				})
				.then(res => {
					expect(res.body.errorId).to.equal('err.notAuthorized');
					done();
				})
				.catch(done);
		});

		it('will return 401 if user attempts to change password of non-existent user', done => {
			request
				.post('/api/1.0/account/login')
				.send({ username: user.username, password: user.password })
				.expect(200)
				.then(() => {
					return request
						.put('/api/1.0/users/NotARealUser/password/')
						.send({ oldPassword: 'Whatever', newPassword: '133t.H@x0rz' })
						.expect(401);
				})
				.then(res => {
					expect(res.body.errorId).to.equal('err.notAuthorized');
					done();
				})
				.catch(done);
		});

		it('will return 400 if validation fails', done => {
			request
				.post('/api/1.0/account/login')
				.send({ username: user.username, password: user.password })
				.expect(200)
				.then(() => {
					return request
						.put(passwordRoute)
						.send({ oldPassword: user.password })
						.expect(400);
				})
				.then(res => {
					expect(res.body.errorId).to.equal('err.validation');
					done();
				})
				.catch(done);
		});

	});

	describe('get profile method', () => {

		let profileRoute;
		beforeEach(done => {
			new User(user)
				.save()
				.then(() => done())
				.catch(done);

			profileRoute = `/api/1.0/users/${user.username}/`;
		});

		it('will return the requested profile if successful', done => {
			request
				.post('/api/1.0/account/login')
				.send({ username: user.username, password: user.password })
				.expect(200)
				.then(() => {
					return request
						.get(profileRoute)
						.expect(200);
				})
				.then(res => {
					expect(res.body.username).to.equal(user.username);
					expect(res.body.email).to.equal(user.email);
					expect(res.body.displayName).to.equal(user.displayName);
					expect(res.body.memberSince).to.exist;
					done();
				})
				.catch(done);
		});

		it('will return 401 if user is not logged in', done => {
			request
				.get(profileRoute)
				.expect(401)
				.then(res => {
					expect(res.body.errorId).to.equal('err.notAuthorized');
					done();
				})
				.catch(done);
		});

		it('will return 401 if user does not own the requested profile', done => {
			const otherUser = {
				username: 'innocent.other.guy',
				displayName: 'Some Dude',
				password: 'Pls.D0nt-Gu33ss.meh',
				email: 'random_bot4235@gmail.com'
			};

			new User(otherUser)
				.save()
				.then(() => {
					return request
						.post('/api/1.0/account/login')
						.send({ username: user.username, password: user.password })
						.expect(200);
				})
				.then(() => {
					return request
						.get(`/api/1.0/users/${otherUser.username}/`)
						.expect(401);
				})
				.then(res => {
					expect(res.body.errorId).to.equal('err.notAuthorized');
					done();
				})
				.catch(done);
		});

		it('will return 401 if profile does not exist', done => {
			request
				.post('/api/1.0/account/login')
				.send({ username: user.username, password: user.password })
				.expect(200)
				.then(() => {
					return request
						.get('/api/1.0/users/WhoDat/')
						.expect(401);
				})
				.then(res => {
					expect(res.body.errorId).to.equal('err.notAuthorized');
					done();
				})
				.catch(done);
		});

	});

});
