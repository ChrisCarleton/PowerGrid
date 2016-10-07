import { connect } from 'react-redux';
import FlashMessage from './flash-message';

const mapStateToProps = state => {
	return state.flashMessage || {};
};

const mapDispatchToProps = (/*dispatch*/) => {

};

const FlashMessageDisplay = connect(
	mapStateToProps,
	mapDispatchToProps)(FlashMessage);

export default FlashMessageDisplay;