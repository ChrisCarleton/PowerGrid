import _ from 'lodash';
import { flashError, flashInfo } from '../../actions/flash-message.actions';
import Formsy from 'formsy-react';
import React from 'react';
import request from 'superagent';
import SecurePage from '../secure-page';
import TextBox from '../forms/text-box';
import store from '../../store';

class ChangePassword extends React.Component {
	constructor(props) {
		super(props);
	}

	onSubmit(model, resetForm) {
		const state = store.getState();
		request
			.put(`/api/1.0/users/${state.user.username}/password/`)
			.send(_.pick(model, ['oldPassword', 'newPassword']))
			.end((err, res) => {
				if (err) {
					return store.dispatch(
						flashError(
							res.body.title || 'A general server error has occurred and your password could not be changed. Please try again later.',
							res.body.description));
				}

				resetForm();
				store.dispatch(flashInfo('Your password was successfully changed.'));
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

export default ChangePassword;
