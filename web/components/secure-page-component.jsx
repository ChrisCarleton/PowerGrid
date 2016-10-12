import NotAuthorized from './errors/not-authorized';
import React from 'react';

class SecurePage extends React.Component {
	render() {
		if (this.props.user.username) {
			return (
				<div>
					{ this.props.children }
				</div>);
		}

		return <NotAuthorized />;
	}
}

SecurePage.propTypes = {
	children: React.PropTypes.node,
	user: React.PropTypes.object
};

export default SecurePage;
