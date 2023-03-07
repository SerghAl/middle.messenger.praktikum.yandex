import Component from '../component';
import { Route } from '.';
import { getUserInfo } from '../Store/Actions';

export default class Router {
	static __instance: Router | null;
	public routes: Array<Route>;
	public history: History | null;
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

	static cleanInatance(rootQuery: string) {
		this.__instance = new Router(rootQuery);
	}

	use(
		pathname: string,
		component: typeof Component,
		props: Props = {}
	): Router {
		const route = new Route(pathname, component, {
			...props,
			rootQuery: this._rootQuery,
		});

		this.routes.push(route);

		return this;
	}

	start(): void {
		window.onpopstate = (() => {
			this._onRoute(window.location.pathname);
		}).bind(this);

		this._onRoute(window.location.pathname);
	}

	_onRoute(pathname: string): void {
		let user = getUserInfo();
		if (pathname !== '/' && pathname !== '/sign-up' && !user) {
			this.go('/');
			return;
		}

		if (pathname === '/' && user) {
			this.go('/messenger');
			return;
		}

		if (pathname === '/sign-up' && user) {
			this.go('/messenger');
			return;
		}

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
		this.history?.pushState({}, '', pathname);
		this._onRoute(pathname);
	}

	back(): void {
		this.history?.back();
	}

	forward(): void {
		this.history?.forward();
	}

	getRoute(pathname: string): Route | undefined {
		let foundedRoute = this.routes.find((route) => route.match(pathname));

		if (foundedRoute) {
			return foundedRoute;
		} else {
			return this.routes.find((route) => route.match('/404'));
		}
	}
}
