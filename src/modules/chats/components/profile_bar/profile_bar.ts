import tpl from './profile_bar.hbs';
import './profile_bar.css';
import Component from '../../../../utils/component';

class ProfileBar extends Component {
	constructor(props: Props) {
		super({ ...props, attrs: { class: 'profile_bar' } }, 'div');
	}

	render() {
		return this.compile(tpl);
	}
}

export default ProfileBar;
