import FlashMessageDisplay from './flash-message-display';
import { IndexLink, Link } from 'react-router';
import React from 'react';

class Nav extends React.Component {
	render() {
		return (
			<div>
				<h1>Power Grid</h1>
				<div id="nav-bar">
					<IndexLink to="/">Home</IndexLink>&nbsp;
					<div>
						<Link to="/login">Login</Link>&nbsp;or&nbsp;
						<Link to="/signup">Sign Up</Link>
					</div>
				</div>
				<FlashMessageDisplay />
				{ this.props.children }
			</div>);
	}
}

Nav.propTypes = {
	children: React.PropTypes.node
};

export default Nav;
