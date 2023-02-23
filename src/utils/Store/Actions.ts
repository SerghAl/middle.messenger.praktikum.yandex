import Store from './Store';

const store = new Store();

export const setUserInfo = (data: Props) => {
	store.set('userInfo', data);
};

export const getUserInfo = () => {
	let state = store.getState();
	let userInfo = state.userInfo;

	return Object.assign({}, userInfo);
};

export const setChats = (data: Props) => {
	store.set('chats', data);
};

export const setDialogue = (data: Props) => {
	store.set('dialogue', data);
};

export const setDialogueMessages = (data: Props) => {
	console.log('setDialogMse');
	let oldMessages = getDialogueMessages();

	if (oldMessages) {
		store.set('dialogueMessages', [...oldMessages, ...data]);
	} else {
		store.set('dialogueMessages', data);
	}
};

export const getDialogueMessages = () => {
	return store.getState().dialogueMessages;
};

export const setChatUsers = (data: Props) => {
	store.set('chatUsers', data);
};

export const getChatUsers = (id: number | string) => {
	return store.getState().chatUsers.find((user) => user.id === Number(id));
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
