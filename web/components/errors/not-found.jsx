import { Link } from 'react-router';
import React from 'react';

class NotFoundPage extends React.Component {
	render() {
		return (
			<div>
				<h2>404 - Page Not Found</h2>
				<p>Please check the address and try again or return <Link to="/">home</Link>.</p>
			</div>);
	}
}

export default NotFoundPage;
