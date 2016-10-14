import React from 'react';

import { ControlLabel, FormControl, FormGroup } from 'react-bootstrap';

class StaticField extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<FormGroup>
				<ControlLabel>{ this.props.label }{ ':' }</ControlLabel>
				<FormControl.Static>{ this.props.value }</FormControl.Static>
			</FormGroup>);
	}
}

StaticField.propTypes = {
	label: React.PropTypes.string.isRequired,
	value: React.PropTypes.string.isRequired
};

export default StaticField;
