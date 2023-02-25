import personImg from '../../static/images/person1.png';
import attachIcon from '../../static/images/clip.svg';
import arrowIcon from '../../static/images/arrow.svg';

import Chat from '../modules/chats';
import Search from '../modules/search';
import TextArrowButton from '../modules/chats/components/button';
import ProfileBar from '../modules/chats/components/profile_bar';
import MessageBar from '../modules/chats/components/message_bar';
import AddBar from '../modules/chats/components/add_bar';

import BaseInput from '../modules/forms/components/base_input';
import IconButton from '../components/icon_button';
import { checkMessage } from '../utils/validation';
import { Router } from '../utils/Router/index';
import UserAPI from '../api/user_api';
import ChatAPI from '../api/chat_api';
import {
	clearDialogueMessages,
	getChatId,
	getChatTitle,
	getCurrentChat,
	getDialogueMessages,
	getUserInfo,
	setChatUsers,
	setChats,
	setDialogue,
} from '../utils/Store/Actions';

import trashIcon from '../../static/images/trash.svg';
import connectToChat from '../utils/services';
import ChatList from '../modules/chats/components/chat_list/chat_list';
import { connect } from '../utils/Store';
import debounce from '../utils/debouncer';
import Modal from '../components/modal';
import { formatDate } from '../utils/formatter';
import MessageList from '../modules/chats/components/message_list';

let socket = null;
let ProfileBarConnect = connect(ProfileBar, (store) => {
	return {
		title: getChatTitle(),
		img: store.dialogue?.avatar || personImg,
	};
});

let chatListConnect = connect(ChatList, (store) => {
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

let chatList = new chatListConnect({ chats: [] });

const router = new Router('.app');

let messageInput = new BaseInput({
	events: {
		blur: () => {
			messageInput.checkValidation();
		},
	},
	validator: checkMessage,
	attrs: {
		name: 'message',
		type: 'text',
		class: 'message_bar--input',
	},
});

let messageBarSettings: Props = {
	method: 'POST',
	action: '/fakeapi/v1/chat',
	messageInput,
	attachBtn: new IconButton({
		src: attachIcon,
		attrs: {
			class: 'message_bar--attach_btn',
		},
		alt: 'Прикрепить файл',
	}),
	sendBtn: new IconButton({
		src: arrowIcon,
		attrs: {
			class: 'message_bar--submit',
		},
		alt: 'Отправить сообщение',
	}),
	events: {
		submit: (e: Event): void => {
			e.preventDefault();
			messageInput.checkValidation();

			let formData = new FormData(<HTMLFormElement>e.target);
			let data = Object.fromEntries(formData.entries());

			if (socket) {
				socket.afterMessage = () => {
					messageInput._element.value = null;
					messageInput._element.focus();

					let messages = document.querySelector('.chat_dialogue--messages');
					messages?.scrollBy(0, messages?.scrollHeight);
				};

				socket.send(
					JSON.stringify({
						content: data.message,
						type: 'message',
					})
				);
			}

			console.log('Message form: ', data);
		},
	},
};

export default {
	messageBar: new MessageBar(messageBarSettings),
	profileBar: new ProfileBarConnect({}),
	profileBtn: new TextArrowButton({
		title: 'Профиль',
		attrs: {
			href: '/profile',
			'data-href': 'profile',
			class: 'btn_textarrow',
		},
		events: {
			click: (e: Event): void => {
				e.preventDefault();
				router.go(`/${e.target.dataset.href}`);
			},
		},
	}),
	createChatBar: new AddBar({
		placeholder: 'Введите название нового чата',
		name: 'title',
		events: {
			submit: (e: Event) => {
				e.preventDefault();

				let formData = new FormData(e.target);

				let data = Object.fromEntries(formData.entries());

				ChatAPI.createChat(data)
					.then(({ response }) => {
						return ChatAPI.getChats();
					})
					.then(({ response }) => {
						setChats(JSON.parse(response));
						Array.from(e.target?.elements).forEach((element) => {
							if (element.type !== 'submit') {
								element.value = '';
							}
						});
					});
			},
		},
	}),
	addUserBar: new AddBar({
		placeholder: 'Введите имя пользователя, которого хотите добавить к чату',
		name: 'title',
		dropdown: true,
		events: {
			input: debounce((e: Event) => {
				e.preventDefault();
				let input = e.target;
				let form = input.parentNode;
				let prevModal = form.querySelector('.modal');
				let data = { login: input?.value };
				let chatId = getChatId();

				if (!data.login && prevModal) {
					form.removeChild(prevModal);
				} else {
					UserAPI.getUserByLogin(data).then(({ response }) => {
						let dataset = JSON.parse(response);

						let modal = new Modal({
							dataset,
							events: {
								click: (e: Event) => {
									e.preventDefault();
									let userId = e.currentTarget.dataset.id;
									let users = [userId];

									ChatAPI.addUsersToChat(chatId, users).then(({ response }) => {
										console.log(response);
									});
								},
							},
						});

						if (prevModal) {
							form.removeChild(prevModal);
						}
						form.appendChild(modal.getContent());
					});
				}
			}, 700),
		},
	}),
	dialogue: {},
	messageList: new MessageList({
		events: {
			scroll: (e: Event) => {
				let scrollTop = e.target.scrollTop;
				let dialogueMessages = getDialogueMessages();
				let messages = document.querySelector('.chat_dialogue--messages');
				let scrollToElementId = messages?.firstElementChild.id;

				if (scrollTop === 0) {
					socket.afterMessage = () => {
						let scrollToElement = document.getElementById(scrollToElementId);
						scrollToElement?.scrollIntoView();
					};

					socket.send(
						JSON.stringify({
							content: dialogueMessages[0].id,
							type: 'get old',
						})
					);
				}
			},
		},
	}),
	search: new Search({
		attrs: { action: '#' },
	}),
	chatList,
};
