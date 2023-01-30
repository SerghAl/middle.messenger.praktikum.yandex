import tpl from './button.hbs';
import './button.css';
import Component from '../../utils/component';

class Button extends Component {
	constructor(props: { [key: PropertyKey]: any }) {
		let styles = 'btn';

		if (props.type) {
			styles += ` btn-${props.type}`;
		}

		if (props.size) {
			styles += ` btn-${props.size}`;
		}

		if (props.attrs && props.attrs.class) {
			styles += ` ${props.attrs.class}`;
		}

		super('button', { ...props, attrs: { class: styles } });
	}

	render() {
		return this.compile(tpl, this.props.title);
	}
}

export default Button;
