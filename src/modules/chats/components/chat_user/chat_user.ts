import tpl from './chat_user.hbs';
import './chat_user.css';

import Component from '../../../../utils/component';

class ChatUser extends Component {
	constructor(props: Props) {
		let styles = 'chat_user';

		super({ ...props, attrs: { class: styles, ...props.attrs } }, 'li');
	}

	addEvents(): void {
		let btn = <HTMLElement>(
			this.getContent().querySelector('.chat_user--remove')
		);
		if (btn) {
			super.addEvents(btn);
		}
	}

	render() {
		return this.compile(tpl);
	}
}

export default ChatUser;
