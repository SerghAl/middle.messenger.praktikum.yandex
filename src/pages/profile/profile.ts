import tpl from './profile.hbs';
import './profile.css';

import Component from '../../utils/component';

class ProfileView extends Component {
	constructor(props: Props) {
		let styles = 'profile_page main_bg';

		if (props.attrs && props.attrs.class) {
			styles += ` ${props.attrs.class}`;
		}

		super({ ...props, attrs: { ...props.attrs, class: styles } }, 'main');
	}

	render() {
		console.log('Page render');
		return this.compile(tpl);
	}

	hide() {
		this.getContent().outerHTML = '';
	}
}

export default ProfileView;
