import tpl from './chat_users_list.hbs';
import './chat_users_list.css';

import Component from '../../../../utils/component';

class ChatUsersList extends Component {
	constructor(props: Props) {
		let styles = 'chat_users_list';

		super('ul', { ...props, attrs: { class: styles, ...props.attrs } });
	}

	render() {
		return this.compile(tpl);
	}
}

export default ChatUsersList;
