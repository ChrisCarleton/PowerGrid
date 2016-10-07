import Formsy from 'formsy-react';
import React from 'react';
import TextBox from '../forms/text-box';

class SignUp extends React.Component {
	constructor(props) {
		super(props);
	}

	onSubmit(/*model, resetForm, invalidateForm */) {

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

					<button type="submit">Sign Up</button>
				</Formsy.Form>
			</div>);
	}
}

export default SignUp;
