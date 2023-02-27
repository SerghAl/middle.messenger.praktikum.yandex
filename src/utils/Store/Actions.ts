import Store from './Store';

const store = new Store();

export const setUserInfo = (data: Props) => {
	store.set('userInfo', data);
};

export const getUserInfo = () => {
	let state = store.getState();
	let userInfo = state.userInfo;
	if (userInfo) {
		return Object.assign({}, userInfo);
	}

	return null;
};

export const setChats = (data: Props) => {
	store.set('chats', data);
};

export const updateChat = (chatId: number, data: Props) => {
	store.set(
		'chats',
		store.getState().chats.map((chat) => {
			if (chat.id === chatId) {
				return { ...chat, ...data };
			} else {
				return chat;
			}
		})
	);
};

export const setDialogue = (data: Props) => {
	store.set('dialogue', data);
};

export const clearDialogueMessages = () => {
	store.set('dialogueMessages', []);
};

export const getCurrentChat = () => {
	return store.getState().dialogue?.id;
};

export const setDialogueMessages = (data: Array<unknown>) => {
	let oldMessages = getDialogueMessages();

	function reverseSort(a: { time: string }, b: { time: string }) {
		if (new Date(a.time) < new Date(b.time)) {
			return -1;
		} else {
			return 1;
		}
	}
	if (oldMessages.length) {
		store.set('dialogueMessages', [...oldMessages, ...data].sort(reverseSort));
	} else {
		store.set('dialogueMessages', data.sort(reverseSort));
	}
};

export const getDialogueMessages = () => {
	return store.getState().dialogueMessages || [];
};

export const setChatUsers = (data: Props) => {
	store.set('chatUsers', data);
};

export const deleteChatUser = (id: number | string) => {
	let newUsers = store
		.getState()
		.chatUsers.filter((user: { id: number }) => user.id !== id);
	store.set('chatUsers', newUsers);
};

export const getAllChatUsers = () => {
	return store.getState().chatUsers;
};

export const getChatUsers = (id: number | string) => {
	return store
		.getState()
		.chatUsers.find((user: { id: number }) => user.id === Number(id));
};

export const isUserMessage = (id: number | string) => {
	return store.getState().userInfo.id === Number(id);
};

export const getChatTitle = () => {
	let state = store.getState();
	let dialogue = state.dialogue;
	if (dialogue) {
		return dialogue.title;
	} else {
		return '';
	}
};

export const getChatId = () => {
	let state = store.getState();
	let dialogue = state.dialogue;
	if (dialogue) {
		return dialogue.id;
	} else {
		return '';
	}
};

export const getChats = () => {
	let state = store.getState();
	let chats = state.chats;

	return Object.assign({}, chats);
};
