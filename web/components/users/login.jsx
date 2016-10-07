import { flashError, flashInfo } from '../../actions/flash-message.actions';
import Formsy from 'formsy-react';
import React from 'react';
import request from 'superagent';
import store from '../../store';

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: ''
		};

		this.onUsernameChanged = this.onUsernameChanged.bind(this);
		this.onPasswordChanged = this.onPasswordChanged.bind(this);
		this.onLoginClicked = this.onLoginClicked.bind(this);
	}

	onUsernameChanged(event) {
		this.setState(Object.assign(this.state, { username: event.target.value }));
	}

	onPasswordChanged(event) {
		this.setState(Object.assign(this.state, { password: event.target.value }));
	}

	onSubmit(model) {
		request
			.post('/api/1.0/account/login/')
			.send(model)
			.end((err, res) => {
				if (err) {
					return store.dispatch(flashError(res.body.title, res.body.description));
				}

				store.dispatch(flashInfo('Log in was successful!'));
			});
	}

	render() {
		return (
			<div>
				<h2>Login</h2>
				<Formsy.Form onValidSubmit={ this.onSubmit }>
					User name:<br />
					<input type="text" id="username" name="username" onChange={ this.onUsernameChanged } value={ this.state.username } /><br />

					Password:<br />
					<input type="password" id="password" name="password" onChange={ this.onPasswordChanged } value={ this.state.password } /><br />

					<button type="submit">Log In</button>
				</Formsy.Form>
			</div>);
	}
}

export default Login;
