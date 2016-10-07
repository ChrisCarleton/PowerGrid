import React from 'react';

class FlashMessage extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		if ( this.props.title ) {
			return (
				<div>
					<p><strong>{ this.props.title }</strong>&nbsp;{ this.props.description }</p>
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
