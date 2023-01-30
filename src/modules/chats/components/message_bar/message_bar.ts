import tpl from './message_bar.hbs';
import './message_bar.css';
import Component from '../../../../utils/component';

class MessageBar extends Component {
	constructor(props: Props) {
		super('div', { ...props, attrs: { class: 'message_bar' } });
	}

	render() {
		return this.compile(tpl);
	}
}

export default MessageBar;
