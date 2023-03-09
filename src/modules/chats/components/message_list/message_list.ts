import tpl from './message_list.hbs';
import './message_list.css';
import Component from '../../../../utils/component';

class MessageList extends Component {
	constructor(props: Props) {
		super(
			{
				...props,
				attrs: {
					class: 'chat_dialogue--messages',
				},
			},
			'div'
		);
	}

	render() {
		return this.compile(tpl);
	}
}

export default MessageList;
