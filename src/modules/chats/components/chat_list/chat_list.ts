import tpl from './chat_list.hbs';
import './chat_list.css';
import Component from '../../../../utils/component';

class ChatList extends Component {
	constructor(props: Props) {
		super(
			{
				...props,
			},
			'ul'
		);
	}

	render() {
		return this.compile(tpl);
	}
}

export default ChatList;
