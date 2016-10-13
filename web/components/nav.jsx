import FlashMessage from './flash-message';
import { IndexLink } from 'react-router';
import React from 'react';
import UserDropdown from './user-dropdown';

import { Navbar } from 'react-bootstrap';

class Nav extends React.Component {
	render() {
		return (
			<div>
				<Navbar>
					<Navbar.Header>
						<Navbar.Brand>
							<IndexLink to="/">Power Grid</IndexLink>
						</Navbar.Brand>
						<Navbar.Toggle />
					</Navbar.Header>
					<Navbar.Collapse>
						<UserDropdown />
					</Navbar.Collapse>
				</Navbar>
				<div className="container">
					<FlashMessage />
					{ this.props.children }
				</div>
			</div>);
	}
}

Nav.propTypes = {
	children: React.PropTypes.node
};

export default Nav;
