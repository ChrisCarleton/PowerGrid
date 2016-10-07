import AppRouter from './router';
import { Provider } from 'react-redux';
import React from 'react';
import { render } from 'react-dom';
import store from './store';

class Application extends React.Component {
	render() {
		return (
			<Provider store={ store }>
				<AppRouter />
			</Provider>);
	}
}

render(
	<Application />,
	document.getElementById('application'));
