import tpl from './chats.hbs';
import './chats.css';
import { dispatcher } from '../../index';
import Component from '../../utils/component';

class Chat extends Component {
	constructor(props: Props) {
		super('div', {
			...props,
			events: {
				click: () => {
					if (this._element.classList.contains('chat-selected')) {
						this._element.classList.remove('chat-selected');

						return;
					} else {
						let prevSelectedChat = document.querySelector('.chat-selected');
						if (prevSelectedChat) {
							prevSelectedChat.classList.remove('chat-selected');
						}

						this._element.classList.add('chat-selected');
						dispatcher.emit('loadChat', this._element);

						return;
					}
				},
			},
			attrs: { class: 'chat' },
		});
	}

	render() {
		return this.compile(tpl);
	}
}

export default Chat;
