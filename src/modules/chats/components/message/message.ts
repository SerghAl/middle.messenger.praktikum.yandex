import tpl from './message.hbs';
import './message.css';

import Component from '../../../../utils/component';

class Message extends Component {
	constructor(props: Props) {
		let styles = 'message';

		if (props.isOwn) {
			styles += ' message-own';
		}

		if (props.images) {
			styles += ' message-with_image';
		}

		super({ ...props, attrs: { class: styles, ...props.attrs } }, 'div');
	}

	render() {
		return this.compile(tpl);
	}
}

export default Message;
