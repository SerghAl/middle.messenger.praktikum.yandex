import tpl from './chat.hbs';
import './chat.css';
import Component from '../../utils/component';

class ChatView extends Component {
	constructor(props: Props) {
		super('main', { ...props, attrs: { class: 'chat_page main_bg' } });
	}

	render() {
		return this.compile(tpl);
	}
}

export default ChatView;
