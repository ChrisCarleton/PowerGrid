import { browserHistory } from 'react-router';
import Formsy from 'formsy-react';
import React from 'react';
import request from 'superagent';
import TextBox from '../forms/text-box';

import { Button, ButtonToolbar, Col, PageHeader, Row } from 'react-bootstrap';

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
					return this.props.flashError(
						res.body.title || 'A general error occurred and you could not be logged in. Please try again later.',
						res.body.description);
				}

				resetForm();
				this.props.onUserSignedIn(res.body);
				browserHistory.push('/');
			});
	}

	render() {
		return (
			<div>
				<PageHeader>Login</PageHeader>
				<Row>
					<Col lg={ 4 } sm={ 12 }>
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

							<ButtonToolbar>
								<Button bsStyle="primary" type="submit">Log In</Button>
							</ButtonToolbar>
						</Formsy.Form>
					</Col>
				</Row>
			</div>);
	}
}

Login.propTypes = {
	onUserSignedIn: React.PropTypes.func.isRequired,
	flashError: React.PropTypes.func.isRequired
};

export default Login;
