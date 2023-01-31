import tpl from './text_button.hbs';
import './text_button.css';
import Component from '../../utils/component';

class TextButton extends Component {
	constructor(props: { [key: PropertyKey]: any }) {
		let styles = 'text_btn';

		if (props.type) {
			styles += ` text_btn-${props.type}`;
		}

		if (props.size) {
			styles += ` text_btn-${props.size}`;
		}

		if (props.attrs && props.attrs.class) {
			styles += ` ${props.attrs.class}`;
		}

		super('button', { ...props, attrs: { class: styles } });
	}

	render() {
		return this.compile(tpl);
	}
}

export default TextButton;
