import { connect } from 'react-redux';
import { flashError } from '../../actions/flash-message.actions';
import LoginComponent from './login-component';
import { signInUser } from '../../actions/user.actions';

const mapStateToProps = () => {
	return {};
};

const mapDispatchToProps = dispatch => {
	return {
		flashError: (title, description) => {
			dispatch(flashError(title, description));
		},
		onUserSignedIn: user => {
			dispatch(signInUser(user));
		}
	};
};

const Login = connect(
	mapStateToProps,
	mapDispatchToProps)(LoginComponent);

export default Login;
