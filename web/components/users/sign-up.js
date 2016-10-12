import { connect } from 'react-redux';
import { signInUser } from '../../actions/user.actions';
import SignUpComponent from './sign-up-component';

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		onUserSignedUp: user => {
			dispatch(signInUser(user));
		}
	};
};

const SignUp = connect(
	mapStateToProps,
	mapDispatchToProps)(SignUpComponent);

export default SignUp;
