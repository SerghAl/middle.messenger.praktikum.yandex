import tpl from './chats.hbs';
import './chats.css';
import Component from '../../utils/component';

class Chat extends Component {
	constructor(props: Props) {
		super('div', {
			...props,
			attrs: { class: 'chat', ...(props.attrs || {}) },
		});
	}

	render() {
		return this.compile(tpl);
	}
}

export default Chat;
