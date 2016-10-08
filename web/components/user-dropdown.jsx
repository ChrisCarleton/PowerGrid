import { browserHistory, Link } from 'react-router';
import { flashError } from '../actions/flash-message.actions';
import React from 'react';
import request from 'superagent';
import { signOutUser } from '../actions/user.actions';
import store from '../store';

class UserDropdown extends React.Component {
	constructor(props) {
		super(props);
	}

	signOut() {
		request
			.post('/api/1.0/account/logout/')
			.end((err, res) => {
				if (err) {
					return flashError(
						res.body.title || 'A general error occurred and you could not be logged out.',
						res.body.description);
				}

				store.dispatch(signOutUser());
				browserHistory.push('/');
			});
	}

	render() {
		if (this.props.user.username) {
			return (
				<div>
					Welcome { this.props.user.displayName || this.props.user.username }&nbsp;
					My Profile
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
	user: React.PropTypes.object
};

export default UserDropdown;
