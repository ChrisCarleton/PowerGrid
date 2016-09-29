import React from 'react';
import { render } from 'react-dom';

//import { createStore } from 'redux';
//import { Provider } from 'react-redux';

class Application extends React.Component {
	render() {
		return (
			<div>Hello React!</div>);
	}
}

render(
	<Application />,
	document.getElementById('application'));
