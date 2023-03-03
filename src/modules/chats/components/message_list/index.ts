import { connect } from '../../../../utils/Store';
import MessageList from './message_list';
import { isUserMessage } from '../../../../utils/Store/Actions';
import Message from '../message';

export default connect(MessageList, (state: Props) => {
	return {
		dialogueMessages: state.dialogueMessages?.map((msg) => {
			let isOwn = isUserMessage(msg.user_id);
			return new Message({
				formatTime: msg.formatTime,
				msg: msg.content,
				isOwn,
				attrs: {
					id: msg.id,
				},
			});
		}),
	};
});
