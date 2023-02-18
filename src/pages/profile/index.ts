import ProfileView from './profile';
import { connect } from '../../utils/Store';

export default connect(ProfileView, (state) => {
	return {
		first_name: state.first_name,
	};
});
