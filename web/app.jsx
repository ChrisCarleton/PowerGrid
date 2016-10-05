import { createStore } from 'redux';
import { Provider } from 'react-redux';
import React from 'react';
import reducers from './reducers/reducers';
import { render } from 'react-dom';

const store = createStore(reducers, window.initialState);

class Application extends React.Component {
	render() {
		return (
			<Provider store={ store }>
				<div>Hello React!</div>
			</Provider>);
	}
}

render(
	<Application />,
	document.getElementById('application'));
