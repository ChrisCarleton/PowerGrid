import { Link } from 'react-router';
import React from 'react';

class NotAuthorizedPage extends React.Component {
	render() {
		return (
			<div>
				<h2>401 - Not Authorized</h2>
				<p>
					You are not currently authorized to view this page. If you are not logged in try&nbsp;
					<Link to="/login">logging in</Link> or return <Link to="/">home</Link>.
				</p>
			</div>);
	}
}

export default NotAuthorizedPage;
