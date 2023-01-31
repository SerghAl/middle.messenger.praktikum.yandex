import tpl from './profile.hbs';
import './profile.css';

import Component from '../../utils/component';

class ProfileView extends Component {
	constructor(props: Props) {
		let styles = 'profile_page main_bg';

		if (props.attrs && props.attrs.class) {
			styles += ` ${props.attrs.class}`;
		}

		super('main', { ...props, attrs: { ...props.attrs, class: styles } });
	}

	render() {
		return this.compile(tpl);
	}
}

export default ProfileView;
