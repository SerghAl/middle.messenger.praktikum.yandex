import tpl from './registration.hbs';
import './registration.css';
import Component from '../../utils/component';

class RegistrationView extends Component {
	constructor(props: Props) {
		let styles = 'reg_page main_bg';

		if (props.attrs && props.attrs.class) {
			styles += ` ${props.attrs.class}`;
		}

		super('main', { ...props, attrs: { ...props.attrs, class: styles } });
	}

	render() {
		return this.compile(tpl);
	}

	hide() {
		this.getContent().outerHTML = '';
	}
}

export default RegistrationView;
