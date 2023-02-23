import tpl from './chat.hbs';
import './chat.css';
import Component from '../../utils/component';
import ChatAPI from '../../api/chat_api';
import { setChats } from '../../utils/Store/Actions';

class ChatView extends Component {
	constructor(props: Props) {
		let styles = 'chat_page main_bg';

		if (props.attrs && props.attrs.class) {
			styles += ` ${props.attrs.class}`;
		}

		super('main', { ...props, attrs: { ...props.attrs, class: styles } });
	}

	render() {
		console.log('render chat');
		return this.compile(tpl);
	}

	hide() {
		this.getContent().outerHTML = '';
	}

	componentDidMount() {
		ChatAPI.getChats().then(({ response }) => {
			console.log(JSON.parse(response));
			setChats(JSON.parse(response));
		});
	}
}

export default ChatView;
