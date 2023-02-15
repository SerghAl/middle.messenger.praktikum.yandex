import tpl from './500.hbs';
import './500.css';
import Component from '../../utils/component';

class ErrorView extends Component {
	constructor(props: Props) {
		let styles = 'error_page';

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

export default ErrorView;
