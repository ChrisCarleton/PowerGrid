import { app } from '../../service/server';
import database from '../../service/data/database';
import { expect } from 'chai';
import Promise from 'bluebird';
import request from 'supertest';
import sinon from 'sinon';
import User from '../../service/data/user.model';

describe('Account controller', () => {

	let user = {};
	beforeEach(() => {
		user = {
			username: 'bill.smiley',
			email: 'bill@company.com',
			displayName: 'I am Bill',
			password: '@dkfo2DF33'
		};
	})

	describe('create account method', () => {

		it('will save the new account if successful', done => {
			request(app)
				.post('/api/1.0/users/')
				.send(user)
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					
					User.findByUsername(user.username)
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
		});

		it('will return a 400 error if validation fails', done => {
			user.email = 'this is not valid';
			request(app)
				.post('/api/1.0/users/')
				.send(user)
				.expect(400)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body.errorId).to.equal('err.validation');
					done();
				});
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

		it('Returns 200 on successful login', done => {
			request(app)
				.post('/api/1.0/account/login')
				.send({ username: user.username, password: user.password })
				.expect(200)
				.end((err, res) => {
					if (err) return done(err);
					expect(res.body.username).to.equal(user.username);
					expect(res.body.email).to.equal(user.email);
					expect(res.body.displayName).to.equal(user.displayName);
					expect(res.body.memberSince).to.exist;
					done();
				});
		});

	});

});
