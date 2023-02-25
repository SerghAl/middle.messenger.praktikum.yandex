import tpl from './icon_button.hbs';
import './icon_button.css';
import Component from '../../utils/component';

class IconButton extends Component {
	constructor(props: { [key: PropertyKey]: any }) {
		let styles = 'icon_btn';

		if (props.type) {
			styles += ` icon_btn-${props.type}`;
		}

		if (props.size) {
			styles += ` icon_btn-${props.size}`;
		}

		if (props.attrs && props.attrs.class) {
			styles += ` ${props.attrs.class}`;
		}

		super('button', { ...props, attrs: { class: styles, ...props.attrs } });
	}

	render() {
		return this.compile(tpl, this.props.title);
	}
}

export default IconButton;
