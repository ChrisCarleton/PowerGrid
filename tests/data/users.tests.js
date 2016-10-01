import { expect } from 'chai';

describe('User data model', () => {

	var user = {};
	beforeEach(() => {
		user = {
			username: 'mike_smith',
			email: 'mike@yahoo.com',
			passwordHash: 'abc123',
			displayName: 'Mike Smith'
		};
	});
	
	describe('validation', () => {

	});

	describe('extension methods', () => {

	});
});
