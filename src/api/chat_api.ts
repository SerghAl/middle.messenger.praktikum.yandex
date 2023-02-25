import HTTPTransport from '../utils/request';
import { BaseAPI } from './base_api';

const chatAPIInstance = new HTTPTransport(
	'https://ya-praktikum.tech/api/v2/chats'
);

export default class ChatAPI extends BaseAPI {
	static getChats() {
		return chatAPIInstance.get('/');
	}

	static createChat(data: Props) {
		return chatAPIInstance.post('/', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify(data),
		});
	}

	static deleteChat(data: Props) {
		return chatAPIInstance.delete('/', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify(data),
		});
	}

	static getChatSendFiles(chatId: number) {
		return chatAPIInstance.get(`/${chatId}/files`);
	}

	static getArchivedChats() {
		return chatAPIInstance.get('/archive');
	}

	static archiveChat(chatId: number) {
		return chatAPIInstance.post('/archive', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				chatId,
			},
		});
	}

	static unarchiveChat(chatId: number) {
		return chatAPIInstance.post('/unarchive', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				chatId,
			},
		});
	}

	static getCommonChat(chatId: number) {
		return chatAPIInstance.get(`/${chatId}/common`);
	}

	static getChatUsers(chatId: number) {
		return chatAPIInstance.get(`/${chatId}/users`);
	}

	static getNewMessagesCount(chatId: number) {
		return chatAPIInstance.get(`/new/${chatId}`);
	}

	static putChatsAvatar(data: FormData) {
		return chatAPIInstance.put('/avatar', {
			data,
		});
	}

	static addUsersToChat(chatId: number, users: Array<number>) {
		return chatAPIInstance.put('/users', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify({
				users,
				chatId,
			}),
		});
	}

	static deleteUsersFromChat(chatId: number, users: Array<number>) {
		return chatAPIInstance.put('/users', {
			data: {
				users,
				chatId,
			},
		});
	}

	static requestToken(id: number) {
		return chatAPIInstance.post(`/token/${id}`);
	}
}
