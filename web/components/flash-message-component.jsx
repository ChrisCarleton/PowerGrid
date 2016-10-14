import React from 'react';

import { Alert, Glyphicon } from 'react-bootstrap';

class FlashMessage extends React.Component {
	constructor(props) {
		super(props);
	}

	getClassName() {
		switch (this.props.messageType) {
			case 'error':
				return 'danger';

			case 'warn':
				return 'warning';

			case 'success':
				return 'success';

			case 'info':
			default:
				return 'info';
		}
	}

	render() {
		if ( this.props.title ) {
			return (
				<Alert bsStyle={ this.getClassName() }>
					<strong>{ this.props.title }</strong>&nbsp;{ this.props.description }&nbsp;
					<a onClick={ this.props.onClearMessage }><Glyphicon glyph="remove" /></a>
				</Alert>);
		}

		return null;
	}
}

FlashMessage.propTypes = {
	messageType: React.PropTypes.oneOf(['info', 'warn', 'error']),
	title: React.PropTypes.string,
	description: React.PropTypes.string,
	onClearMessage: React.PropTypes.func.isRequired
};

export default FlashMessage;
