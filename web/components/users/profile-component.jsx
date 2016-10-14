import Formsy from 'formsy-react';
import React from 'react';
import request from 'superagent';
import SecurePage from '../secure-page';
import StaticField from '../forms/static-field';
import TextBox from '../forms/text-box';

import { Button, ButtonToolbar, Col, PageHeader, Row } from 'react-bootstrap';

class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			submitDisabled: false
		};

		this.onSubmit = this.onSubmit.bind(this);
	}

	onSubmit(model, resetForm, invalidateForm) {
		this.setState(Object.assign({}, this.state, { submitDisabled: true }));

		const url = `/api/1.0/users/${this.props.username}/`;
		request
			.put(url)
			.send(model)
			.end((err, res) => {
				this.setState(Object.assign({}, this.state, { submitDisabled: false }));

				if (err) {
					if (res.body.errorId === 'err.validation.emailTaken') {
						return invalidateForm({
							email: 'Your selected e-mail is already in the system.'
						});
					}

					return this.props.flashError(
						res.body.title || 'A general error occurred and your profile could not be saved. Please try again later.',
						res.body.description);
				}

				this.props.onUserUpdated({
					username: this.props.username,
					email: model.email,
					displayName: model.displayName,
					memberSince: this.props.memberSince
				});
				return this.props.flashInfo('User profile was successfully saved.');
			});
	}

	render() {
		return (
			<SecurePage>
				<PageHeader>Edit Profile for { this.props.displayName }</PageHeader>
				<Row>
					<Col lg={ 4 } sm={ 12 }>
						<Formsy.Form onValidSubmit={ this.onSubmit }>
							<StaticField
								label="Username"
								value={ this.props.username } />

							<StaticField
								label="Member since"
								value={ this.props.memberSince } />

							<TextBox
								id="displayName"
								name="displayName"
								label="Display name"
								value={ this.props.displayName }
								required />

							<TextBox
								id="email"
								name="email"
								label="E-mail address"
								value={ this.props.email }
								validations={ {
									isEmail: true
								} }
								validationErrors={ {
									isEmail: 'Not a valid e-mail address.'
								} }
								required />

							<ButtonToolbar>
								<Button bsStyle="primary" type="submit" disabled={ this.state.submitDisabled }>Update Profile</Button>
							</ButtonToolbar>
						</Formsy.Form>
					</Col>
				</Row>
			</SecurePage>);
	}
}

Profile.propTypes = {
	username: React.PropTypes.string.isRequired,
	email: React.PropTypes.string.isRequired,
	displayName: React.PropTypes.string.isRequired,
	memberSince: React.PropTypes.string.isRequired,
	onUserUpdated: React.PropTypes.func.isRequired,
	flashError: React.PropTypes.func.isRequired,
	flashInfo: React.PropTypes.func.isRequired
};

export default Profile;
