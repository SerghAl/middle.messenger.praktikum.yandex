import { Router } from '.';
import { ROUTES } from '.';
import authData from '../../fixtures/authorization';
import chatsData from '../../fixtures/chats';
import profileData from '../../fixtures/profile';
import regData from '../../fixtures/registration';

afterEach(() => {
	Router.cleanInatance('.app');
});

describe('Тестирование роутера', () => {
	test('Работа history API', () => {
		let root = document.createElement('div');
		root.classList.add('app');
		window.document.body.appendChild(root);

		let router = new Router('.app');
		router
			.use('/', ROUTES.AUTHORIZATION, authData)
			.use('/sign-up', ROUTES.REGISTRATION, regData)
			.use('/settings', ROUTES.PROFILE, profileData)
			.use('/messenger', ROUTES.CHAT, chatsData)
			.use('/404', ROUTES.UNFOUND, {})
			.use('/500', ROUTES.ERROR, {})
			.start();

		router.go('/sign-up');
		router.go('/');
		router.back();
		router.forward();
		expect(window.history.length).toBe(3);
	});

	test('Инициализация роутера', () => {
		let root = document.createElement('div');
		root.classList.add('app');
		window.document.body.appendChild(root);

		let router = new Router('.app');
		router
			.use('/', ROUTES.AUTHORIZATION, authData)
			.use('/sign-up', ROUTES.REGISTRATION, regData)
			.use('/settings', ROUTES.PROFILE, profileData)
			.use('/messenger', ROUTES.CHAT, chatsData)
			.use('/404', ROUTES.UNFOUND, {})
			.use('/500', ROUTES.ERROR, {})
			.start();

		expect(window.location.pathname).toBe('/');
	});

	test('Переходы незарегистрированного пользователя на разрешенные пути', () => {
		let root = document.createElement('div');
		root.classList.add('app');
		window.document.body.appendChild(root);

		let router = new Router('.app');
		router
			.use('/', ROUTES.AUTHORIZATION, authData)
			.use('/sign-up', ROUTES.REGISTRATION, regData)
			.use('/settings', ROUTES.PROFILE, profileData)
			.use('/messenger', ROUTES.CHAT, chatsData)
			.use('/404', ROUTES.UNFOUND, {})
			.use('/500', ROUTES.ERROR, {})
			.start();

		router.go('/sign-up');
		expect(window.location.pathname).toBe('/sign-up');

		router.go('/');
		expect(window.location.pathname).toBe('/');
	});

	test('Переходы незарегистрированного пользователя на запрещенные пути', () => {
		let root = document.createElement('div');
		root.classList.add('app');
		window.document.body.appendChild(root);

		let router = new Router('.app');
		router
			.use('/', ROUTES.AUTHORIZATION, authData)
			.use('/sign-up', ROUTES.REGISTRATION, regData)
			.use('/settings', ROUTES.PROFILE, profileData)
			.use('/messenger', ROUTES.CHAT, chatsData)
			.use('/404', ROUTES.UNFOUND, {})
			.use('/500', ROUTES.ERROR, {})
			.start();

		router.go('/settings');
		expect(window.location.pathname).toBe('/');

		router.go('/messenger');
		expect(window.location.pathname).toBe('/');

		router.go('/404');
		expect(window.location.pathname).toBe('/');

		router.go('/500');
		expect(window.location.pathname).toBe('/');
	});
});
