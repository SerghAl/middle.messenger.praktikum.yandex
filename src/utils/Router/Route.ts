import Component from '../component';

function isEqual(lhs: unknown, rhs: unknown): boolean {
	return lhs === rhs;
}

function render(query: string, component: Component) {
	const root = document.querySelector(query);
	root?.appendChild(component.getContent());
	return root;
}

export default class Route {
	private _pathname;
	private _componentClass: typeof Component;
	private _component: Component | null;
	private _props;

	constructor(pathname: string, view: typeof Component, props: Props) {
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
			this._component = null;
		}
	}

	match(pathname: string): boolean {
		return isEqual(pathname, this._pathname);
	}

	render(): void {
		if (!this._component) {
			this._component = new this._componentClass('div', this._props); //fix first arg

			render(this._props.rootQuery, this._component);
			return;
		}
		this._component.show();
	}
}
