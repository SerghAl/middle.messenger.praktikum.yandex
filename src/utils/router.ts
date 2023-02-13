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
import Component from './component';

export const ROUTES: { [key: string]: Component } = {
	CHAT: ChatView,
	PROFILE: ProfileView,
	UNFOUND: UnfoundView,
	ERROR: ErrorView,
	AUTHORIZATION: AuthorizationView,
	REGISTRATION: registrationView,
};

function isEqual(lhs: unknown, rhs: unknown): boolean {
	return lhs === rhs;
}

function render(query: string, component: Component) {
	const root = document.querySelector(query);
	root?.appendChild(component.getContent());
	return root;
}

class Route {
	private _pathname;
	private _componentClass;
	private _component: Component | null;
	private _props;

	constructor(pathname: string, view: Component, props: Props) {
		this._pathname = pathname;
		this._componentClass = view;
		this._component = null;
		this._props = props;
	}

	navigate(pathname: string): void {
		if (this.match(pathname)) {
			this._pathname = pathname;
			this.render();
		}
	}

	leave(): void {
		if (this._component) {
			this._component.hide();
		}
	}

	match(pathname: string): boolean {
		return isEqual(pathname, this._pathname);
	}

	render(): void {
		if (!this._component) {
			this._component = new this._componentClass();
			render(this._props.rootQuery, this._component);
			return;
		}

		this._component.show();
	}
}

export default class Router {
	static __instance: Router;
	public routes: Array<Route>;
	public history: History;
	private _currentRoute: Route | null;
	private _rootQuery: string;

	constructor(rootQuery: string) {
		if (Router.__instance) {
			return Router.__instance;
		}

		this.routes = [];
		this.history = window.history;
		this._currentRoute = null;
		this._rootQuery = rootQuery;

		Router.__instance = this;
	}

	use(pathname: string, component: Component): Router {
		const route = new Route(pathname, component, {
			rootQuery: this._rootQuery,
		});

		this.routes.push(route);

		return this;
	}

	start(): void {
		window.onpopstate = ((event: PopStateEvent) => {
			if (event.currentTarget && event.currentTarget.location) {
				this._onRoute(event.currentTarget.location.pathname);
			}
		}).bind(this);

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string): void {
		const route = this.getRoute(pathname);
		if (!route) {
			return;
		}

		if (this._currentRoute && this._currentRoute !== route) {
			this._currentRoute.leave();
		}

		this._currentRoute = route;
		route.render();
	}

	go(pathname: string): void {
		this.history.pushState({}, '', pathname);
		this._onRoute(pathname);
	}

	back(): void {
		this.history.back();
	}

	forward(): void {
		this.history.forward();
	}

	getRoute(pathname: string): Route | undefined {
		return this.routes.find((route) => route.match(pathname));
	}
}

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
