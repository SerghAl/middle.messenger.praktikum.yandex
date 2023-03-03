// import EventEmitter from './utils/event_bus';
import authData from './fixtures/authorization';
import chatsData from './fixtures/chats';
import profileData from './fixtures/profile';
import regData from './fixtures/registration';

// export const dispatcher = new EventEmitter();
import { Router, ROUTES } from './utils/Router/index';

const router = new Router('.app');

router
	.use('/', ROUTES.AUTHORIZATION, authData)
	.use('/sign-up', ROUTES.REGISTRATION, regData)
	.use('/settings', ROUTES.PROFILE, profileData)
	.use('/messenger', ROUTES.CHAT, chatsData)
	.use('/404', ROUTES.UNFOUND, {})
	.use('/500', ROUTES.ERROR, {})
	.start();
