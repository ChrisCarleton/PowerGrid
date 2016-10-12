import _ from 'lodash';
import { connect } from 'react-redux';
import { flashError, flashInfo } from '../../actions/flash-message.actions';
import ProfileComponent from './profile-component';
import { signInUser } from '../../actions/user.actions';

const mapStateToProps = state => {
	return _.pick(state.user, ['username', 'email', 'displayName', 'memberSince']);
};

const mapDispatchToProps = dispatch => {
	return {
		onUserUpdated: user => {
			dispatch(signInUser(user));
		},
		flashError: (title, description) => {
			dispatch(flashError(title, description));
		},
		flashInfo: (title, description) => {
			dispatch(flashInfo(title, description));
		}
	};
};

const Profile = connect(
	mapStateToProps,
	mapDispatchToProps)(ProfileComponent);

export default Profile;
