import tpl from './registration.hbs';
import './registration.css';
import Component from '../../utils/component';

class RegistrationView extends Component {
	constructor(props: Props) {
		super('main', { ...props, attrs: { class: 'reg_page main_bg' } });
	}

	render() {
		return this.compile(tpl);
	}
}

export default RegistrationView;
