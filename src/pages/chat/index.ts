import ChatView from './chat';
import { connect } from '../../utils/Store';
import ChatAPI from '../../api/chat_api';
import AuthAPI from '../../api/auth_api';
const chatAPI = new ChatAPI();

chatAPI.getChats().then((response) => console.log(response));

export default connect(ChatView, (state: Props) => {
	console.log(state);
});
