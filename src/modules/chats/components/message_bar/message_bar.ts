import tpl from './message_bar.hbs';
import './message_bar.css';
import Component from '../../../../utils/component';

class MessageBar extends Component {
	constructor(props: Props) {
		super({ ...props, attrs: { class: 'message_bar' } }, 'div');
	}

	addEvents(): void {
		let input = this.getContent().querySelector('form');
		if (input) {
			super.addEvents(input);
		}
	}

	render() {
		return this.compile(tpl);
	}
}

export default MessageBar;
