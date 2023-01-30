import tpl from './authorization.hbs';
import './authorization.css';
import Component from '../../utils/component';

class AuthorizationView extends Component {
	constructor(props: { [key: PropertyKey]: any }) {
		super('main', {
			...props,
			attrs: { class: 'auth_page main_bg' },
		});
	}

	render() {
		return this.compile(tpl);
	}
}

export default AuthorizationView;
