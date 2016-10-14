import { Link } from 'react-router';
import React from 'react';

import { PageHeader } from 'react-bootstrap';

class NotAuthorizedPage extends React.Component {
	render() {
		return (
			<div>
				<PageHeader>401 - Not Authorized</PageHeader>
				<p>
					You are not currently authorized to view this page. If you are not logged in try&nbsp;
					<Link to="/login">logging in</Link> or return <Link to="/">home</Link>.
				</p>
			</div>);
	}
}

export default NotAuthorizedPage;
