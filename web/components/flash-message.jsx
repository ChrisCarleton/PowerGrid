import { clearFlashMessage } from '../actions/flash-message.actions';
import React from 'react';
import store from '../store';

class FlashMessage extends React.Component {
	constructor(props) {
		super(props);
	}

	getClassName() {
		switch (this.props.messageType) {
			case 'error':
				return 'flash-message-error';

			case 'warn':
				return 'flash-message-warn';

			case 'info':
			default:
				return 'flash-message-info';
		}
	}

	clearMessage() {
		store.dispatch(clearFlashMessage());
	}

	render() {
		if ( this.props.title ) {
			return (
				<div className={ this.getClassName() }>
					<p>
						<strong>{ this.props.title }</strong>&nbsp;{ this.props.description }&nbsp;
						<button onClick={ this.clearMessage }>Ok</button>
					</p>
				</div>);
		}

		return null;
	}
}

FlashMessage.propTypes = {
	messageType: React.PropTypes.oneOf(['info', 'warn', 'error']),
	title: React.PropTypes.string,
	description: React.PropTypes.string
};

export default FlashMessage;
