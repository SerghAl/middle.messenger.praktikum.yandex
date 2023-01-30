import tpl from './fullheight_button.hbs';
import './fullheight_button.css';

import Component from '../../utils/component';

class FullheightButton extends Component {
	constructor(props: Props) {
		super('a', {
			...props,
			attrs: {
				href: '/chat',
				'data-href': 'chat',
				class: 'fullheight_btn',
			},
		});
	}

	render() {
		return this.compile(tpl);
	}
}

export default FullheightButton;
