import ProfileView from './profile';
import { connect } from '../../utils/Store';

export default connect(ProfileView, (state: TStore) => {
	if (!state.userInfo) {
		return {};
	}
	return {
		...state.userInfo,
	};
});
