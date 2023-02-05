import tpl from './profile_bar.hbs';
import './profile_bar.css';
import Component from '../../../../utils/component';

class ProfileBar extends Component {
	constructor(props: Props) {
		super('div', { ...props, attrs: { class: 'profile_bar' } });
	}

	render() {
		return this.compile(tpl);
	}
}

export default ProfileBar;
