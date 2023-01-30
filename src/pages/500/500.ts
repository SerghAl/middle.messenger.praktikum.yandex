import tpl from './500.hbs';
import './500.css';
import Component from '../../utils/component';

class ErrorView extends Component {
	constructor(props: Props) {
		super('main', { ...props, attrs: { class: 'error_page' } });
	}

	render() {
		return this.compile(tpl);
	}
}

export default ErrorView;
