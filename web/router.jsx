import Dashboard from './components/dashboard';
import { IndexRoute, Route, Router, browserHistory } from 'react-router';
import Login from './components/users/login';
import Nav from './components/nav';
import NotFoundPage from './components/errors/not-found';
import React from 'react';
import SignUp from './components/users/sign-up';

class AppRouter extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router history={ browserHistory }>
				<Route path="/" component={ Nav }>
					<IndexRoute component={ Dashboard } />
					<Route path="/login" component={ Login } />
					<Route path="/signup" component={ SignUp } />

					<Route path="*" component={ NotFoundPage } />
				</Route>
			</Router>);
	}
}

export default AppRouter;
