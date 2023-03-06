import tpl from './chat.hbs';
import './chat.css';
import Component from '../../utils/component';
import ChatAPI from '../../api/chat_api';
import {
	clearDialogueMessages,
	setChats,
	setDialogue,
} from '../../utils/Store/Actions';

class ChatView extends Component {
	constructor(props: Props) {
		let styles = 'chat_page main_bg';

		if (props.attrs && props.attrs.class) {
			styles += ` ${props.attrs.class}`;
		}

		super({ ...props, attrs: { ...props.attrs, class: styles } }, 'main');
	}

	render() {
		return this.compile(tpl);
	}

	hide() {
		this.getContent().outerHTML = '';
	}

	componentDidUpdate(oldProps: Props, newProps: Props): boolean {
		return super.componentDidUpdate(oldProps, newProps);
	}

	componentDidMount() {
		setDialogue(null);
		clearDialogueMessages();
		ChatAPI.getChats().then(({ response }) => {
			console.log(JSON.parse(response));
			setChats(JSON.parse(response));
		});
	}
}

export default ChatView;
