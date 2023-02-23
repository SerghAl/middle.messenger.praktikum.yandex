import HTTPTransport from '../utils/request';
import { BaseAPI } from './base_api';

const authAPIInstance = new HTTPTransport(
	'https://ya-praktikum.tech/api/v2/auth'
);

export default class AuthAPI extends BaseAPI {
	static signUp(data: Props) {
		return authAPIInstance.post('/signup', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify(data),
		});
	}

	static signIn(data: Props) {
		return authAPIInstance.post('/signin', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify(data),
		});
	}

	static getUserInfo() {
		return authAPIInstance.get('/user');
	}

	static logOut() {
		return authAPIInstance.post('/logout');
	}
}
