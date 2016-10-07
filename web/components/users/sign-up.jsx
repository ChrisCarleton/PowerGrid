import React from 'react';

class SignUp extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: '',
			password: '',
			displayName: '',
			email: ''
		};
	}

	onUsernameChanged(/*event*/) {

	}

	// onPasswordChanged(event) {

	// }

	// onEmailChanged(event) {

	// }

	// onDisplayNameChanged(event) {

	// }

	render() {
		return (
			<div>
				<h2>Sign Up</h2>
				<form>
					User name:<br />
					<input type="text" id="username" name="username" onChange={ this.onUsernameChanged } value={ this.state.username } />
					<br />

					Password:<br />
				</form>
			</div>);
	}
}

export default SignUp;
