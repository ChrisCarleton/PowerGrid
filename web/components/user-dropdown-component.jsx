import { browserHistory, Link } from 'react-router';
import React from 'react';
import request from 'superagent';

import { MenuItem, Nav, NavDropdown, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

class UserDropdown extends React.Component {
	constructor(props) {
		super(props);

		this.signOut = this.signOut.bind(this);
	}

	signOut() {
		request
			.post('/api/1.0/account/logout/')
			.end((err, res) => {
				if (err) {
					return this.props.flashError(
						res.body.title || 'A general error occurred and you could not be logged out.',
						res.body.description);
				}

				this.props.onSignOutUser();
				browserHistory.push('/');
			});
	}

	render() {
		if (this.props.user.username) {
			return (
				<Nav pullRight>
					<NavDropdown title={ `Welcome ${this.props.user.displayName || this.props.user.username}` } id="user_dropdown">
						<LinkContainer to="/profile">
							<MenuItem>My Profile</MenuItem>
						</LinkContainer>
						<LinkContainer to="/changePassword">
							<MenuItem>Change My Password</MenuItem>
						</LinkContainer>
						<MenuItem divider />
						<MenuItem onClick={ this.signOut }>Sign Out</MenuItem>
					</NavDropdown>
				</Nav>);
		}

		return (
			<Nav pullRight>
				<LinkContainer to="/login">
					<NavItem>Login</NavItem>
				</LinkContainer>
				<LinkContainer to="/signup">
					<NavItem>Sign Up</NavItem>
				</LinkContainer>
			</Nav>);
	}
}

UserDropdown.propTypes = {
	user: React.PropTypes.object,
	onSignOutUser: React.PropTypes.func.isRequired,
	flashError: React.PropTypes.func.isRequired
};

export default UserDropdown;
