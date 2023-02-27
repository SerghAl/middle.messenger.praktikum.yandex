import tpl from './chat_user.hbs';
import './chat_user.css';

import Component from '../../../../utils/component';

class ChatUser extends Component {
	constructor(props: Props) {
		let styles = 'chat_user';

		super('li', { ...props, attrs: { class: styles, ...props.attrs } });
	}

	addEvents(): void {
		let btn = this._element.querySelector('.chat_user--remove');
		super.addEvents(btn);
	}

	render() {
		return this.compile(tpl);
	}
}

export default ChatUser;
