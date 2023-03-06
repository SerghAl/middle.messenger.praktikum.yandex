import Router from './Router';
// import { ROUTES } from '.';
// import authData from '../../fixtures/authorization';

describe('Тестирование роутера', () => {
	test('Инициализация роутера', () => {
		let root = document.createElement('div');
		root.classList.add('app');
		window.document.body.appendChild(root);

		let router = new Router('.app');
		router.start();

		expect(window.location.pathname).toBe('/');
	});
});
