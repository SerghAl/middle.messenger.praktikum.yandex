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
	updateChat,
} from '../utils/Store/Actions';

import trashIcon from '../../static/images/trash.svg';
import connectToChat from '../utils/services';
import ChatList from '../modules/chats/components/chat_list/chat_list';
import { connect } from '../utils/Store';
import debounce from '../utils/debouncer';
import Modal from '../components/modal';
import { formatDate } from '../utils/formatter';
import MessageList from '../modules/chats/components/message_list';
import ImageForm from '../modules/forms/components/image_form';
import { BASE_URL } from '../settings/constants';
import ChatUsersList from '../modules/chats/components/chat_users_list';

let socket: TExtendedSocket | null = null;
let ProfileBarConnect = connect(ProfileBar, (store: TStore) => {
	return {
		title: getChatTitle(),
		img: store.dialogue?.avatar || personImg,
	};
});

let ChatImageFormClass = connect(ImageForm, () => {});

let chatListConnect = connect(ChatList, (store: TStore) => {
	return {
		chats: store.chats?.map(
			(chat: Props) =>
				new Chat({
					attrs: {
						'data-id': chat.id,
					},
					chatImg: new ChatImageFormClass({
						method: 'POST',
						type: 'file',
						label: 'Аватар',
						name: 'avatar',
						baseClass: 'chat',
						attrs: { class: 'chat--avatar' },
						value:
							chat && chat.avatar
								? `${BASE_URL}/resources${chat.avatar}`
								: personImg,
						events: {
							change: (e: Event) => {
								e.preventDefault();
								e.stopPropagation();
								let target = <HTMLElement>e.currentTarget;
								let formData = new FormData(
									<HTMLFormElement>target?.parentNode?.parentNode
								);

								formData.append('chatId', chat.id);

								ChatAPI.putChatsAvatar(formData)
									.then(({ response }) => {
										let data = JSON.parse(response);
										updateChat(chat.id, { avatar: data.avatar });
										setDialogue({
											title: chat.title,
											id: chat.id,
											avatar:
												chat && chat.avatar
													? `${BASE_URL}/resources${chat.avatar}`
													: personImg,
										});
									})
									.catch((error) => {
										console.log(error);
									});
							},
						},
					}),
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
								let target = <HTMLElement>e.currentTarget;
								let chatId = target?.dataset.id;
								let data = { chatId };

								let agreement = confirm('Вы уверены, что хотите удалить чат?');

								if (agreement) {
									ChatAPI.deleteChat(data)
										.then(() => {
											return ChatAPI.getChats();
										})
										.then(({ response }) => {
											setChats(JSON.parse(response));
										});
								}
							},
						},
					}),
					events: {
						click: (e: Event) => {
							let target = <HTMLElement>e.currentTarget;
							if (target?.classList.contains('chat-selected')) {
								target.classList.remove('chat-selected');
							} else {
								let prevSelectedChat = document.querySelector('.chat-selected');
								if (prevSelectedChat) {
									prevSelectedChat.classList.remove('chat-selected');
								}

								target.classList.add('chat-selected');

								let chatId = target.dataset.id || '';
								let userId = getUserInfo()?.id;
								let token = null;

								if (Number(chatId) === Number(getCurrentChat())) {
									return;
								} else {
									clearDialogueMessages();
								}

								ChatAPI.getChatUsers(Number(chatId))
									.then(({ response }) => {
										setChatUsers(JSON.parse(response));

										return ChatAPI.requestToken(Number(chatId)).then(
											({ response }) => {
												token = JSON.parse(response).token;
												setDialogue({
													title: chat.title,
													id: chat.id,
													avatar: chat.avatar
														? `${BASE_URL}/resources${chat.avatar}`
														: personImg,
												});
												socket = connectToChat(userId, chatId, token);
											}
										);
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
			if (!messageInput.checkValidation()) return;

			let formData = new FormData(<HTMLFormElement>e.target);
			let data = Object.fromEntries(formData.entries());

			if (socket) {
				socket.afterMessage = () => {
					let messageInputElement = <HTMLInputElement>messageInput.getContent();

					messageInputElement.value = '';
					messageInputElement.focus();

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
	profileBar: new ProfileBarConnect({ chatUsersList: new ChatUsersList({}) }),
	profileBtn: new TextArrowButton({
		title: 'Профиль',
		attrs: {
			href: '/settings',
			'data-href': 'settings',
			class: 'btn_textarrow',
		},
		events: {
			click: (e: Event): void => {
				e.preventDefault();

				let target = <HTMLElement>e.target;
				router.go(`/${target?.dataset.href}`);
			},
		},
	}),
	createChatBar: new AddBar({
		placeholder: 'Введите название нового чата',
		name: 'title',
		addBtn: true,
		events: {
			submit: (e: Event) => {
				e.preventDefault();
				let form = <HTMLFormElement>e.target;
				let formData = new FormData(form);

				let data = Object.fromEntries(formData.entries());

				ChatAPI.createChat(data)
					.then(() => {
						return ChatAPI.getChats();
					})
					.then(({ response }) => {
						setChats(JSON.parse(response));

						Array.from(form?.elements).forEach((element: HTMLInputElement) => {
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
				let input = <HTMLInputElement>e.target;
				let form = <HTMLFormElement>input?.parentNode;
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
									let target = <HTMLElement>e.currentTarget;
									let userId = target?.dataset?.id || '';
									let users = [userId];

									ChatAPI.addUsersToChat(chatId, users)
										.then(() => {
											return ChatAPI.getChatUsers(chatId);
										})
										.then(({ response }) => {
											setChatUsers(JSON.parse(response));
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
				let target = <HTMLElement>e.target;
				let scrollTop = target?.scrollTop;
				let dialogueMessages = getDialogueMessages();
				let messages = document.querySelector('.chat_dialogue--messages');
				let scrollToElementId = messages?.firstElementChild?.id || '';

				if (scrollTop === 0) {
					if (socket && scrollToElementId) {
						socket.afterMessage = () => {
							let scrollToElement = document.getElementById(scrollToElementId);
							scrollToElement?.scrollIntoView();
						};
					}

					socket?.send(
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
