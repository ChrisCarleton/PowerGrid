import { connect } from 'react-redux';
import SecurePageComponent from './secure-page-component';

const mapStateToProps = state => {
	return {
		user: state.user || {}
	};
};

const mapDispatchToProps = (/* dispatch */) => {
	return {};
};

const SecurePage = connect(
	mapStateToProps,
	mapDispatchToProps)(SecurePageComponent);

export default SecurePage;
