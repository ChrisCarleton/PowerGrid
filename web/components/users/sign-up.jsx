import { browserHistory } from 'react-router';
import { flashError } from '../../actions/flash-message.actions';
import Formsy from 'formsy-react';
import React from 'react';
import TextBox from '../forms/text-box';
import request from 'superagent';
import { signInUser } from '../../actions/user.actions';
import store from '../../store';

class SignUp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			submitDisabled: false
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(model, resetForm, invalidateForm) {
		this.setState(Object.assign({}, this.state, { submitDisabled: true }));
		request
			.post('/api/1.0/users/')
			.send({
				username: model.username,
				password: model.password,
				displayName: model.displayName,
				email: model.email
			})
			.end((err, res) => {
				this.setState(Object.assign({}, this.state, { submitDisabled: false }));
				if (!err) {
					// Account was created and user was logged in.
					resetForm();
					store.dispatch(signInUser(res.body));
					return browserHistory.push('/');
				}

				switch (res.body.errorId) {
					case 'err.validation.usernameTaken':
						return invalidateForm({ username: 'User name is already taken.' });

					case 'err.validation.emailTaken':
						return invalidateForm({ email: 'E-mail address is already taken.' });

					default:
						// General server or validation error.
						return flashError(
							res.body.title || 'A general server error has occurred. Please try again later.',
							res.body.description);
				}
			});
	}

	render() {
		return (
			<div>
				<h2>Sign Up</h2>
				<Formsy.Form onValidSubmit={ this.onSubmit }>
					<TextBox
						id="username"
						name="username"
						label="User name"
						validations={ {
							matchRegexp: /^[a-z0-9_\-\.]+$/i,
							maxLength: 60
						} }
						validationErrors={ {
							matchRegexp: 'User names can consist of letters, numbers, underscores, dots, and hyphens.',
							maxLength: 'User names cannot be longer than 60 characters.'
						} }
						value=""
						required />

					<TextBox
						id="password"
						type="password"
						name="password"
						label="Password"
						value=""
						required />

					<TextBox
						id="confirmPassword"
						type="password"
						name="confirmPassword"
						label="Confirm password"
						value=""
						validations={ {
							equalsField: 'password'
						} }
						validationErrors={ {
							equalsField: 'Passwords do not match.'
						} }
						required />

					<TextBox
						id="email"
						name="email"
						label="E-mail address"
						value=""
						validations={ {
							isEmail: true
						} }
						validationErrors={ {
							isEmail: 'E-mail address must be valid.'
						} }
						required />

					<TextBox
						id="displayName"
						name="displayName"
						label="Display name"
						value=""
						required />

					<button type="submit" disabled={ this.state.submitDisabled }>Sign Up</button>
				</Formsy.Form>
			</div>);
	}
}

export default SignUp;
