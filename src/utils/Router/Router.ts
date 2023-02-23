import Component from '../component';
import { Route } from '.';
import AuthAPI from '../../api/auth_api';

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

	use(pathname: string, component: Component, props: Props = {}): Router {
		const route = new Route(pathname, component, {
			...props,
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
