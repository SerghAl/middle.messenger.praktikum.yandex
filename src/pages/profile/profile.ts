import profileView from './profile.hbs';
import './profile.css';

import { getRoute } from '../../utils/router';
import { documentClassNameListener } from '../../utils/listener';

export default profileView;

documentClassNameListener('click', 'profile_page--btn_back', (e) =>
	getRoute(e)
);
