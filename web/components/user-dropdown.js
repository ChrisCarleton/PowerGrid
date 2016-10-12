import { flashError } from '../actions/flash-message.actions';
import { connect } from 'react-redux';
import { signOutUser } from '../actions/user.actions';
import UserDropdown from './user-dropdown-component';

const mapStateToProps = state => {
	return {
		user: state.user || {}
	};
};

const mapDispatchToProps = dispatch => {
	return {
		flashError: (title, description) => {
			dispatch(flashError(title, description));
		},
		onSignOutUser: () => {
			dispatch(signOutUser());
		}
	};
};

const UserDropdownState = connect(
	mapStateToProps,
	mapDispatchToProps)(UserDropdown);

export default UserDropdownState;
