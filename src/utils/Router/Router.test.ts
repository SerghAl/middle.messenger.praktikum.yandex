import Router from './Router';
import { ROUTES } from '.';
import authData from '../../fixtures/authorization';

describe('Тестирование роутера', () => {
	test('Инициализация роутера', () => {
		let root = document.createElement('div');
		root.classList.add('app');
		window.document.appendChild(root);

		let router = new Router('.app');
		router.use('/', ROUTES.AUTHORIZATION, authData).start();

		expect(window.location).toBe('/');
	});
});
