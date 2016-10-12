import _ from 'lodash';
import Formsy from 'formsy-react';
import React from 'react';
import request from 'superagent';
import SecurePage from '../secure-page';
import TextBox from '../forms/text-box';

class ChangePassword extends React.Component {
	constructor(props) {
		super(props);
		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(model, resetForm) {
		request
			.put(`/api/1.0/users/${this.props.username}/password/`)
			.send(_.pick(model, ['oldPassword', 'newPassword']))
			.end((err, res) => {
				if (err) {
					return this.props.flashError(
							res.body.title || 'A general server error has occurred and your password could not be changed. Please try again later.',
							res.body.description);
				}

				resetForm();
				this.props.flashInfo('Your password was successfully changed.');
			});
	}

	render() {
		return (
			<SecurePage>
				<h2>Change Password</h2>
				<Formsy.Form onValidSubmit={ this.onSubmit }>
					<TextBox
						id="oldPassword"
						name="oldPassword"
						type="password"
						label="Old password"
						value=""
						required />

					<TextBox
						id="newPassword"
						name="newPassword"
						type="password"
						label="New password"
						value=""
						validations={ {
							matchRegexp: window.appSettings.passwordStrengthRegex
						} }
						validationErrors={ {
							matchRegexp: 'Password does not meet strength requirements. It must contain a letter, a number, a special character and be at least 7 characters long.'
						} }
						required />

					<TextBox
						id="confirmPassword"
						name="confirmPassword"
						type="password"
						label="Confirm password"
						value=""
						validation={ {
							equalsField: 'newPassword'
						} }
						validationErrors={ {
							equalsField: 'Passwords do not match.'
						} }
						required />

					<button type="submit">Change Password</button>
				</Formsy.Form>
			</SecurePage>);
	}
}

ChangePassword.propTypes = {
	username: React.PropTypes.string.isRequired,
	flashError: React.PropTypes.func.isRequired,
	flashInfo: React.PropTypes.func.isRequired
};

export default ChangePassword;
