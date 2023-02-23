import ChatView from './chat';
import { connect } from '../../utils/Store';
import { Message } from '../../modules/chats';
import { isUserMessage } from '../../utils/Store/Actions';
// import getChatData from '../../fixtures/chats';

export default connect(ChatView, (state: Props) => {
	console.log(state.dialogueMessages);
	return {
		dialogue: state.dialogue,
		dialogueMessages: state.dialogueMessages?.map((msg) => {
			let isOwn = isUserMessage(msg.user_id);
			return new Message({
				time: msg.time,
				msg: msg.content,
				isOwn,
			});
		}),
	};
});
