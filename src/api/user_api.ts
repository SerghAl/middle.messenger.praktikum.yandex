import HTTPTransport from '../utils/request';
import { BaseAPI } from './base_api';

const userAPIInstance = new HTTPTransport('/user');

export default class UserAPI extends BaseAPI {
	static changeProfile(data: Props) {
		return userAPIInstance.put('/profile', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify(data),
		});
	}

	static changeAvatar(data: Props) {
		return userAPIInstance.put('/profile/avatar', {
			data,
		});
	}

	static changePassword(data: Props) {
		return userAPIInstance.put('/password', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify(data),
		});
	}

	static getUserById(id: number) {
		return userAPIInstance.get(`/user/${id}`);
	}

	static getUserByLogin(data: Props) {
		return userAPIInstance.post('/search', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify(data),
		});
	}
}
