import { getRoute, setRoute, ROUTES } from './utils/router';
import EventEmitter from './utils/event_emitter';
import authData from './fixtures/authorization';
import chatsData from './fixtures/chats';
import dialogueData from './fixtures/dialogue';

import { documentDataAttrListener } from './utils/listener';

export const dispatcher = new EventEmitter();

dispatcher.subscribe('loadChat', () => {
	let dialogue = { dialogueData };

	setRoute(ROUTES.CHAT, { ...chatsData, dialogue });
});

documentDataAttrListener('click', 'href', (e) => {
	e.preventDefault();
	getRoute(e);
});

setRoute(ROUTES.AUTHORIZATION, authData);
