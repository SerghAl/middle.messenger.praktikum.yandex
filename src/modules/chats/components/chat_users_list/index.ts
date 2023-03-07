import ChatUsersList from './chat_users_list';
import { connect } from '../../../../utils/Store';
import ChatUser from '../chat_user';
import {
	clearDialogueMessages,
	deleteChatUser,
	getAllChatUsers,
	getChatId,
	setChats,
	setDialogue,
} from '../../../../utils/Store/Actions';
import ChatAPI from '../../../../api/chat_api';

export default connect(ChatUsersList, (store: TStore) => {
	let chatUsers = store.chatUsers?.map(
		(chatUser: { login: string; id: string }) =>
			new ChatUser({
				login: chatUser.login,
				events: {
					click: (e: Event) => {
						e.preventDefault();
						let chatId = getChatId();
						let users = [chatUser.id];
						let agreement = confirm(
							`Вы действительно хотите удалить ${chatUser.login} из чата?`
						);

						if (agreement) {
							ChatAPI.deleteUsersFromChat(chatId, users)
								.then(() => {
									deleteChatUser(chatUser.id);
									return ChatAPI.getChats();
								})
								.then(({ response }) => {
									setChats(JSON.parse(response));
									if (!getAllChatUsers().length) {
										clearDialogueMessages();
										setDialogue(null);
									}
								});
						}
					},
				},
			})
	);
	return {
		chatUsers,
	};
});
