import HTTPTransport from '../utils/request';
import { BaseAPI } from './base_api';

const chatAPIInstance = new HTTPTransport(
	'https://ya-praktikum.tech/api/v2/chats'
);

export default class ChatAPI extends BaseAPI {
	getChats() {
		return chatAPIInstance.get('/');
	}

	createChat(title: string) {
		return chatAPIInstance.post('/chats', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				title,
			},
		});
	}

	deleteChat(chatId: number) {
		return chatAPIInstance.delete('/chats', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				chatId,
			},
		});
	}

	getChatSendFiles(chatId: number) {
		return chatAPIInstance.get(`/chats/${chatId}/files`);
	}

	getArchivedChats() {
		return chatAPIInstance.get('/chats/archive');
	}

	archiveChat(chatId: number) {
		return chatAPIInstance.post('/chats/archive', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				chatId,
			},
		});
	}

	unarchiveChat(chatId: number) {
		return chatAPIInstance.post('/chats/unarchive', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				chatId,
			},
		});
	}

	getCommonChat(chatId: number) {
		return chatAPIInstance.get(`/chats/${chatId}/common`);
	}

	getChatUsers(chatId: number) {
		return chatAPIInstance.get(`/chats/${chatId}/users`);
	}

	getNewMessagesCount(chatId: number) {
		return chatAPIInstance.get(`/chats/new/${chatId}`);
	}

	putChatsAvatar(data: FormData) {
		return chatAPIInstance.put('/chats/avatar', {
			data,
		});
	}

	addUsersToChat(chatId: number, users: Array<number>) {
		return chatAPIInstance.put('/chats/users', {
			data: {
				users,
				chatId,
			},
		});
	}

	deleteUsersFromChat(chatId: number, users: Array<number>) {
		return chatAPIInstance.put('/chats/users', {
			data: {
				users,
				chatId,
			},
		});
	}

	requestToken(id: number) {
		return chatAPIInstance.put(`/chats/token/${id}`, {
			data: {
				id,
			},
		});
	}
}
