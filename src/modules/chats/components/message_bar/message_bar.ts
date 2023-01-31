import tpl from './message_bar.hbs';
import './message_bar.css';
import Component from '../../../../utils/component';

class MessageBar extends Component {
	constructor(props: Props) {
		super('div', { ...props, attrs: { class: 'message_bar' } });
	}

	addEvents(): void {
		let input = this._element.querySelector('form');
		if (input) {
			super.addEvents(input);
		}
	}

	render() {
		return this.compile(tpl);
	}
}

export default MessageBar;
