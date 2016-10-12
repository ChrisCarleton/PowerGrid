import FlashMessageDisplay from './flash-message-display';
import { IndexLink } from 'react-router';
import React from 'react';
import UserDropdown from './user-dropdown';

class Nav extends React.Component {
	render() {
		return (
			<div>
				<h1>Power Grid</h1>
				<div id="nav-bar">
					<IndexLink to="/">Home</IndexLink>&nbsp;
				</div>
				<UserDropdown />
				<FlashMessageDisplay />
				{ this.props.children }
			</div>);
	}
}

Nav.propTypes = {
	children: React.PropTypes.node
};

export default Nav;
