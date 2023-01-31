import tpl from './chat.hbs';
import './chat.css';
import Component from '../../utils/component';

class ChatView extends Component {
	constructor(props: Props) {
		let styles = 'chat_page main_bg';

		if (props.attrs && props.attrs.class) {
			styles += ` ${props.attrs.class}`;
		}

		super('main', { ...props, attrs: { ...props.attrs, class: styles } });
	}

	render() {
		return this.compile(tpl);
	}
}

export default ChatView;
