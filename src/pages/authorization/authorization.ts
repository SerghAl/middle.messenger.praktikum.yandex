import tpl from './authorization.hbs';
import './authorization.css';
import Component from '../../utils/component';

class AuthorizationView extends Component {
	constructor(props: { [key: PropertyKey]: any }) {
		let styles = 'auth_page main_bg';

		if (props.attrs && props.attrs.class) {
			styles += ` ${props.attrs.class}`;
		}

		super(
			{
				...props,
				attrs: { ...props.attrs, class: styles },
			},
			'main'
		);
	}

	render() {
		return this.compile(tpl);
	}

	hide() {
		this.getContent().outerHTML = '';
	}
}

export default AuthorizationView;
