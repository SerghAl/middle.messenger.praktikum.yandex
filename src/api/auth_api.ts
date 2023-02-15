import HTTPTransport from '../utils/request';
import { BaseAPI } from './base_api';

const authAPIInstance = new HTTPTransport(
	'https://ya-praktikum.tech/api/v2/auth'
);

interface SignInData {
	login: string;
	password: string;
}

export default class AuthAPI extends BaseAPI {
	static signUp() {
		return authAPIInstance.post('/signup', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				first_name: 'string',
				second_name: 'Sec',
				login: 'testuseragains22',
				email: 'test@mail.ruagain22',
				password: 'P@ssw0rd',
				phone: '89999999999',
			},
		});
	}

	static signIn({ login, password }: SignInData) {
		return authAPIInstance.post('/signin', {
			headers: {
				'Content-Type': 'application/json',
			},
			data: {
				login,
				password,
			},
		});
	}

	static getUserInfo() {
		return authAPIInstance.post('/user');
	}

	static logOut() {
		return authAPIInstance.post('/logout');
	}
}
