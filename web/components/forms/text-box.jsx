import { Decorator as FormsyElement } from 'formsy-react';
import React from 'react';

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

	render() {
		return (
			<div>
				<span>{ this.props.label }{ this.props.isRequired() ? '*' : null }:</span>
				<br />
				<input
					type={ this.props.type || 'text' }
					value={ this.state.value }
					onChange={ e => this.setState({ value: e.target.value }) }
					onBlur={ () => this.props.setValue(this.state.value) } />

				{ !this.props.isPristine() && this.props.showRequired() ? <span>{ this.props.label } is required.</span> : null }
				{ !this.props.isPristine() ? <span>{ this.props.getErrorMessage() }</span> : null }
			</div>);
	}
}

TextBox.propTypes = Object.assign({
	label: React.PropTypes.string.isRequired,
	type: React.PropTypes.oneOf(['text', 'password'])
});

export default TextBox;
