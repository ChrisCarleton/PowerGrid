import { clearFlashMessage } from '../actions/flash-message.actions';
import { connect } from 'react-redux';
import FlashMessage from './flash-message-component';

const mapStateToProps = state => {
	return state.flashMessage || {};
};

const mapDispatchToProps = dispatch => {
	return {
		onClearMessage: () => {
			dispatch(clearFlashMessage());
		}
	};
};

const FlashMessageDisplay = connect(
	mapStateToProps,
	mapDispatchToProps)(FlashMessage);

export default FlashMessageDisplay;
