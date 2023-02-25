import ChatList from './chat_list';
import { connect } from '../../../../utils/Store';

import Chat from '../..';

import { formatDate } from '../../../../utils/formatter';
import IconButton from '../../../../components/icon_button';
import trashIcon from '../../../../../static/images/trash.svg';

import ChatAPI from '../../../../api/chat_api';

import {
	getUserInfo,
	getCurrentChat,
	setChats,
	setChatUsers,
	clearDialogueMessages,
	setDialogue,
} from '../../../../utils/Store/Actions';
import connectToChat from '../../../../utils/services';

export default connect(ChatList, (store) => {
	let socket = null;

	return {
		chats: store.chats?.map(
			(chat) =>
				new Chat({
					attrs: {
						'data-id': chat.id,
					},
					img: chat.avatar,
					chatTitle: chat.title,
					chatMsg: chat.last_message?.content,
					chatTime: chat.last_message
						? formatDate(chat.last_message?.time)
						: null,
					chatNewMsgs: chat.unread_count,
					delBtn: new IconButton({
						src: trashIcon,
						attrs: { class: 'chat--btn_del', 'data-id': chat.id },
						events: {
							click: (e: Event) => {
								e.preventDefault();
								e.stopPropagation();
								let chatId = e.currentTarget.dataset.id;
								let data = { chatId };

								ChatAPI.deleteChat(data)
									.then(({ response }) => {
										return ChatAPI.getChats();
									})
									.then(({ response }) => {
										setChats(JSON.parse(response));
									});
							},
						},
					}),
					events: {
						click: (e: Event) => {
							e.preventDefault();

							if (e.currentTarget.classList.contains('chat-selected')) {
								e.currentTarget.classList.remove('chat-selected');
							} else {
								let prevSelectedChat = document.querySelector('.chat-selected');
								if (prevSelectedChat) {
									prevSelectedChat.classList.remove('chat-selected');
								}

								e.currentTarget.classList.add('chat-selected');

								let chatId = e.currentTarget.dataset.id;
								let userId = getUserInfo().id;
								let token = null;
								console.log(chatId, getCurrentChat());

								if (Number(chatId) === Number(getCurrentChat())) {
									return;
								} else {
									clearDialogueMessages();
								}

								ChatAPI.getChatUsers(chatId)
									.then(({ response }) => {
										setChatUsers(JSON.parse(response));

										return ChatAPI.requestToken(chatId).then(({ response }) => {
											token = JSON.parse(response).token;
											setDialogue({ title: chat.title, id: chat.id });
											socket = connectToChat(userId, chatId, token);
										});
									})
									.catch((error) => {
										console.log(error);
									});
							}
						},
					},
				})
		),
	};
});
