import ProfileView from './profile';
import { connect } from '../../utils/Store';
import getProfileData from '../../fixtures/profile';

export default connect(ProfileView, (state) => {
	if (!state.userInfo) {
		return {
			...getProfileData({}),
		};
	}
	return {
		...getProfileData(state.userInfo),
	};
});
