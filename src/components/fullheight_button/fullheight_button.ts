import tpl from './fullheight_button.hbs';
import './fullheight_button.css';

import Component from '../../utils/component';

class FullheightButton extends Component {
	constructor(props: Props) {
		let styles = 'fullheight_btn';

		if (props.attrs && props.attrs.class) {
			styles += ` ${props.attrs.class}`;
		}

		super('a', {
			...props,
			attrs: {
				...props.attrs,
				class: styles,
			},
		});
	}

	render() {
		return this.compile(tpl);
	}
}

export default FullheightButton;
