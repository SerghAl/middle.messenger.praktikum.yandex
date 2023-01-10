import chatView from '../pages/chat';
import homeView from '../pages/home';
import profileView from '../pages/profile';
import unfoundView from '../pages/404';
import errorView from '../pages/500';
import authorizationView from '../pages/authorization';
import registrationView from '../pages/registration/registration';

import chatsData from '../fixtures/chats';
import profileData from '../fixtures/profile';
import authData from '../fixtures/authorization';
import regData from '../fixtures/registration';

export const ROUTES = {
	HOME: homeView,
	CHAT: chatView,
	PROFILE: profileView,
	UNFOUND: unfoundView,
	ERROR: errorView,
	AUTHORIZATION: authorizationView,
	REGISTRATION: registrationView,
};

export const setRoute = (route, data) => {
	document.getElementById('app').innerHTML = route(data);
};

export const getRoute = (e) => {
	e.preventDefault();
	let route;

	if (e.lastTarget) {
		route = e.lastTarget.dataset.href;
	} else {
		route = e.target.dataset.href;
	}

	switch (route) {
		case 'chat':
			setRoute(ROUTES.CHAT, chatsData);
			break;
		case 'home':
			setRoute(ROUTES.HOME);
			break;
		case 'profile':
			setRoute(ROUTES.PROFILE, profileData);
			break;
		case 'error':
			setRoute(ROUTES.ERROR);
			break;
		case 'unfound':
			setRoute(ROUTES.UNFOUND);
			break;
		case 'authorization':
			setRoute(ROUTES.AUTHORIZATION, authData);
			break;
		case 'registration':
			setRoute(ROUTES.REGISTRATION, regData);
			break;
		default:
			setRoute(ROUTES.CHAT);
			break;
	}
};
