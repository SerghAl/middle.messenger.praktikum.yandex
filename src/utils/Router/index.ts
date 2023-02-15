import Route from './Route';
import Router from './Router';
import Component from '../component';
import ChatView from '../../pages/chat';
import ProfileView from '../../pages/profile';
import UnfoundView from '../../pages/404';
import ErrorView from '../../pages/500';
import AuthorizationView from '../../pages/authorization';
import RegistrationView from '../../pages/registration/registration';

const ROUTES: { [key: string]: Component } = {
	CHAT: ChatView,
	PROFILE: ProfileView,
	UNFOUND: UnfoundView,
	ERROR: ErrorView,
	AUTHORIZATION: AuthorizationView,
	REGISTRATION: RegistrationView,
};

export { Route, Router, ROUTES };
