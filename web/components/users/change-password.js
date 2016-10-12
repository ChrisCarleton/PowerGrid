import ChangePasswordComponent from './change-password-component';
import { connect } from 'react-redux';
import { flashError, flashInfo } from '../../actions/flash-message.actions';

const mapStateToProps = state => {
	return {
		username: state.user ? state.user.username : ''
	};
};

const mapDispatchToProps = dispatch => {
	return {
		flashError: (title, description) => {
			dispatch(flashError(title, description));
		},
		flashInfo: (title, description) => {
			dispatch(flashInfo(title, description));
		}
	};
};

const ChangePassword = connect(
	mapStateToProps,
	mapDispatchToProps)(ChangePasswordComponent);

export default ChangePassword;
