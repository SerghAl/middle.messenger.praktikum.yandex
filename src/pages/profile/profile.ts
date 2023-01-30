import tpl from './profile.hbs';
import './profile.css';

import Component from '../../utils/component';

class ProfileView extends Component {
	constructor(props: Props) {
		super('main', { ...props, attrs: { class: 'profile_page main_bg' } });
	}

	render() {
		return this.compile(tpl);
	}
}

export default ProfileView;
