import { browserHistory, Link } from 'react-router';
import React from 'react';
import request from 'superagent';

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
				<div>
					Welcome { this.props.user.displayName || this.props.user.username }&nbsp;
					<Link to="/profile">My Profile</Link>&nbsp;
					<Link to="/changePassword">Change My Password</Link>&nbsp;
					<a href="#" onClick={ this.signOut }>Sign Out</a>
				</div>);
		}

		return (
			<div>
				<Link to="/login">Login</Link>&nbsp;or&nbsp;
				<Link to="/signup">Sign Up</Link>
			</div>);
	}
}

UserDropdown.propTypes = {
	user: React.PropTypes.object,
	onSignOutUser: React.PropTypes.func.isRequired,
	flashError: React.PropTypes.func.isRequired
};

export default UserDropdown;
