import tpl from './authorization.hbs';
import './authorization.css';
import Component from '../../utils/component';

class AuthorizationView extends Component {
	constructor(props: { [key: PropertyKey]: any }) {
		let styles = 'auth_page main_bg';

		if (props.attrs && props.attrs.class) {
			styles += ` ${props.attrs.class}`;
		}

		super('main', {
			...props,
			attrs: { ...props.attrs, class: styles },
		});
	}

	render() {
		return this.compile(tpl);
	}
}

export default AuthorizationView;
