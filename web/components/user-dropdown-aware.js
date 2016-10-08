import { connect } from 'react-redux';
import UserDropdown from './user-dropdown';

const mapStateToProps = state => {
	return {
		user: state.user || {}
	};
};

const mapDispatchToProps = (/* dispatch */) => {
	return {};
};

const UserDropdownAware = connect(
	mapStateToProps,
	mapDispatchToProps)(UserDropdown);

export default UserDropdownAware;
