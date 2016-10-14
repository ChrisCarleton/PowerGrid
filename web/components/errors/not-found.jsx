import { Link } from 'react-router';
import React from 'react';

import { PageHeader } from 'react-bootstrap';

class NotFoundPage extends React.Component {
	render() {
		return (
			<div>
				<PageHeader>404 - Page Not Found</PageHeader>
				<p>Please check the address and try again or return <Link to="/">home</Link>.</p>
			</div>);
	}
}

export default NotFoundPage;
