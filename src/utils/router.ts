import ChatView from '../pages/chat';
import ProfileView from '../pages/profile';
import UnfoundView from '../pages/404';
import ErrorView from '../pages/500';
import AuthorizationView from '../pages/authorization';
import registrationView from '../pages/registration/registration';

import chatsData from '../fixtures/chats';
import profileData from '../fixtures/profile';
import authData from '../fixtures/authorization';
import regData from '../fixtures/registration';

export const ROUTES = {
	CHAT: ChatView,
	PROFILE: ProfileView,
	UNFOUND: UnfoundView,
	ERROR: ErrorView,
	AUTHORIZATION: AuthorizationView,
	REGISTRATION: registrationView,
};

export const setRoute = (View, data: Props): void => {
	let root = document.getElementById('app');

	if (root) {
		let page = new View(data);
		root.innerHTML = '';
		root.appendChild(page.getContent());
	}
};

export const getRoute = (e: Event): void => {
	e.preventDefault();
	let target = <HTMLElement>e.target;
	let route = target.dataset.href;

	switch (route) {
		case 'chat':
			setRoute(ROUTES.CHAT, chatsData);
			break;
		case 'profile':
			setRoute(ROUTES.PROFILE, profileData);
			break;
		case 'error':
			setRoute(ROUTES.ERROR, {});
			break;
		case 'unfound':
			setRoute(ROUTES.UNFOUND, {});
			break;
		case 'authorization':
			setRoute(ROUTES.AUTHORIZATION, authData);
			break;
		case 'registration':
			setRoute(ROUTES.REGISTRATION, regData);
			break;
		default:
			setRoute(ROUTES.CHAT, chatsData);
			break;
	}
};
