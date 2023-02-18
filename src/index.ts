// import EventEmitter from './utils/event_bus';
import authData from './fixtures/authorization';
import chatsData from './fixtures/chats';
import dialogueData from './fixtures/dialogue';
import profileData from './fixtures/profile';
import regData from './fixtures/registration';

// export const dispatcher = new EventEmitter();
import { Router, Route, ROUTES } from './utils/Router/index';

const router = new Router('.app');

router
	.use('/', ROUTES.AUTHORIZATION, authData)
	.use('/authorization', ROUTES.AUTHORIZATION, authData)
	.use('/registration', ROUTES.REGISTRATION, regData)
	.use('/profile', ROUTES.PROFILE, profileData)
	.use('/chat', ROUTES.CHAT, chatsData)
	.use('/unfound', ROUTES.UNFOUND, {})
	.use('/error', ROUTES.ERROR, {})
	.start();

// dispatcher.on('loadChat', (): void => {
// 	let dialogue = dialogueData;

let navLinks = Array.from(document.querySelectorAll('.main_nav--link'));

navLinks.forEach((link) => {
	link.addEventListener('click', (e: Event) => {
		e.preventDefault();
		router.go(`/${e.target.dataset.href}`);
	});
});
