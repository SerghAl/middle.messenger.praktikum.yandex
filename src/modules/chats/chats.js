import Chat from './chats.hbs';
import styles from './chats.css';
import { dispatcher } from '../../index';

import Message from './components/message';

document.addEventListener('click', (e) => {
	let target = e.target;

	while (target.parentNode !== null) {
		if (target.classList.contains('chat-selected')) {
			target.classList.remove('chat-selected');

			return;
		} else if (target.classList.contains('chat')) {
			let prevSelectedChat = document.querySelector('.chat-selected');
			if (prevSelectedChat) {
				prevSelectedChat.classList.remove('chat-selected');
			}

			target.classList.add('chat-selected');
			dispatcher.emit('loadChat', target);

			return;
		} else {
			target = target.parentNode;
		}
	}
});

export { Message };
export default Chat;
