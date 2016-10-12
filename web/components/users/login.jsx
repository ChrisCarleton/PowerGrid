import { browserHistory } from 'react-router';
import { flashError } from '../../actions/flash-message.actions';
import Formsy from 'formsy-react';
import React from 'react';
import request from 'superagent';
import { signInUser } from '../../actions/user.actions';
import store from '../../store';
import TextBox from '../forms/text-box';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(model, resetForm) {
		request
			.post('/api/1.0/account/login/')
			.send(model)
			.end((err, res) => {
				if (err) {
					return store.dispatch(flashError(
						res.body.title || 'A general error occurred and you could not be logged in. Please try again later.',
						res.body.description));
				}

				resetForm();
				store.dispatch(signInUser(res.body));
				browserHistory.push('/');
			});
	}

	render() {
		return (
			<div>
				<h2>Login</h2>
				<Formsy.Form onValidSubmit={ this.onSubmit }>
					<TextBox
						id="username"
						name="username"
						label="User name"
						value=""
						required />

					<TextBox
						id="password"
						name="password"
						label="Password"
						type="password"
						value=""
						required />

					<button type="submit">Log In</button>
				</Formsy.Form>
			</div>);
	}
}

export default Login;
