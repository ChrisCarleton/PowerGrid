import { Decorator as FormsyElement } from 'formsy-react';
import React from 'react';

import { ControlLabel, FormControl, FormGroup, HelpBlock } from 'react-bootstrap';

@FormsyElement()
class TextBox extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.getValue()
		};
	}

	componentWillReceiveProps(newProps) {
		this.setState({ value: newProps.getValue() });
	}

	getValidationState() {
		if (this.props.isPristine()) {
			return null;
		}

		if (this.props.showRequired() || this.props.getErrorMessage()) {
			return 'error';
		}

		return 'success';
	}

	render() {
		return (
			<FormGroup validationState={ this.getValidationState() }>
				<ControlLabel>{ this.props.label }{ this.props.isRequired() ? '*' : null }:</ControlLabel>
				<FormControl
					id={ this.props.id }
					type={ this.props.type || 'text' }
					value={ this.state.value }
					onChange={ e => this.setState({ value: e.target.value }) }
					onBlur={ () => this.props.setValue(this.state.value) } />

				{ !this.props.isPristine() && this.props.showRequired() ? <HelpBlock>{ this.props.label } is required.</HelpBlock> : null }
				{ !this.props.isPristine() ? <HelpBlock>{ this.props.getErrorMessage() }</HelpBlock> : null }
			</FormGroup>);
	}
}

TextBox.propTypes = Object.assign({
	id: React.PropTypes.string.isRequired,
	label: React.PropTypes.string.isRequired,
	type: React.PropTypes.oneOf(['text', 'password'])
});

export default TextBox;
