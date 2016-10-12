import React from 'react';

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

	render() {
		if ( this.props.title ) {
			return (
				<div className={ this.getClassName() }>
					<p>
						<strong>{ this.props.title }</strong>&nbsp;{ this.props.description }&nbsp;
						<button onClick={ this.props.onClearMessage }>Ok</button>
					</p>
				</div>);
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
