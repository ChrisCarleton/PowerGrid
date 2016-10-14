import React from 'react';

import { PageHeader } from 'react-bootstrap';

class Dashboard extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<PageHeader>Home Page</PageHeader>
				<p>Isn't it great?</p>
			</div>);
	}
}

export default Dashboard;
