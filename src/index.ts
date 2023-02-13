import { getRoute, setRoute, ROUTES } from './utils/router';
import EventEmitter from './utils/event_bus';
import authData from './fixtures/authorization';
import chatsData from './fixtures/chats';
import dialogueData from './fixtures/dialogue';

export const dispatcher = new EventEmitter();
import Router from './utils/router';
import { ROUTES } from './utils/router';

const router = new Router('.app');
router.use('/', ROUTES.AUTHORIZATION);

dispatcher.on('loadChat', (): void => {
	let dialogue = dialogueData;

	setRoute(ROUTES.CHAT, { ...chatsData, dialogue });
});

let navLinks = Array.from(document.querySelectorAll('.main_nav--link'));

navLinks.forEach((link) => {
	link.addEventListener('click', (e: Event) => {
		e.preventDefault();
		getRoute(e);
	});
});

router.go('/');

// setRoute(ROUTES.AUTHORIZATION, authData);
