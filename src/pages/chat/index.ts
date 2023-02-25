import ChatView from './chat';
import { connect } from '../../utils/Store';
import { Message } from '../../modules/chats';
import { isUserMessage } from '../../utils/Store/Actions';
import { Router } from '../../utils/Router';

export default connect(ChatView, (state: Props) => {
	return {
		dialogue: state.dialogue,
	};
});
