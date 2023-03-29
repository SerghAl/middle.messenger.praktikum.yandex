import EventBus from './event_bus';
import { v4 as uuidv4 } from 'uuid';

class Component {
	eventBus;
	props;
	children;
	_id;

	private _meta: { tagName: string; propsAndChildren: Props };
	private _element: HTMLElement;

	static EVENTS: { [key: PropertyKey]: string } = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	constructor(propsAndChildren: Props = {}, tagName: string = 'div') {
		this._meta = {
			tagName,
			propsAndChildren,
		};
		this._id = uuidv4();
		this.eventBus = new EventBus();

		let { props, children } = this._getPropsAndChildren(propsAndChildren);

		this.props = this._makePropsProxy(props);
		this.children = children;

		this._registerEvents();
		this.eventBus.emit(Component.EVENTS.INIT);
	}

	_getPropsAndChildren(props: Props) {
		let children: Props = {};
		let newProps: Props = {};

		Object.entries(props).forEach(([key, value]) => {
			let isComponent = value instanceof Component;
			let isArrayOfComponents =
				value instanceof Array && value[0] instanceof Component;

			// тот случай, когда непонятно, что будет содержать массив
			let isEmptyArray = value instanceof Array && !value.length;

			if (isComponent || isArrayOfComponents) {
				children[key] = value;
			} else if (isEmptyArray) {
				children[key] = value;
				newProps[key] = value;
			} else {
				newProps[key] = value;
			}
		});
		return { props: newProps, children };
	}

	_registerEvents() {
		this.eventBus.on(Component.EVENTS.INIT, this.init.bind(this));
		this.eventBus.on(
			Component.EVENTS.FLOW_CDM,
			this._componentDidMount.bind(this)
		);
		this.eventBus.on(
			Component.EVENTS.FLOW_CDU,
			this._componentDidUpdate.bind(this)
		);
		this.eventBus.on(Component.EVENTS.FLOW_RENDER, this._render.bind(this));
	}

	_createComponent() {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	}

	init() {
		this._createComponent();
		this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
		this.componentDidMount();
	}

	_componentDidMount() {
		this.componentDidMount();
		Object.values(this.children).forEach((child) => {
			child.dispatchComponentDidMount();
		});
	}

	componentDidMount(): void {}

	dispatchComponentDidMount() {
		this.eventBus.emit(Component.EVENTS.FLOW_CDM);
		if (Object.keys(this.children).length)
			this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
	}

	_componentDidUpdate(oldProps: Props, newProps: Props): void {
		const { props, children } = this._getPropsAndChildren(newProps);

		const response = this.componentDidUpdate(oldProps, props);
		this.children = { ...this.children, ...children };

		if (!response) {
			return;
		}

		this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
	}

	componentDidUpdate(oldProps: Props, newProps: Props): boolean {
		if (oldProps !== newProps) {
			return true;
		}
		return false;
	}

	setProps(nextProps: Props): void {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	}

	get element(): HTMLElement {
		return this._element;
	}

	addEvents(target?: HTMLElement): void {
		const { events = {} } = this.props;
		Object.keys(events).forEach((event: string): void => {
			if (target) {
				target.addEventListener(event, events[event]);
			} else {
				this._element.addEventListener(event, events[event]);
			}
		});
	}

	removeEvents(): void {
		const { events = {} } = this.props;

		Object.keys(events).forEach((event: string): void => {
			this._element.removeEventListener(event, events[event]);
		});
	}

	addAttributes(): void {
		const { attrs = {} } = this.props;

		Object.keys(attrs).forEach((attr: string): void => {
			this._element.setAttribute(attr, attrs[attr]);
		});
	}

	_render(): void {
		const component = this.render() || document.createDocumentFragment();
		this.removeEvents();
		this._element.innerHTML = '';
		this._element.appendChild(component);
		this.addAttributes();
		this.addEvents();
		this.afterRender();
	}

	afterRender(): void {}

	render(): DocumentFragment | null {
		return null;
	}

	_createStub(id: string): string {
		return `<div data-id=${id}></div>`;
	}

	_replaceStub(
		replaceId: string,
		replaceEl: Component,
		replaceTarget: DocumentFragment
	): void {
		let stub = replaceTarget.querySelector(`[data-id="${replaceId}"]`);
		if (stub) {
			stub.replaceWith(replaceEl.getContent());
		}
	}

	compile(tpl: Function, ...data: any): DocumentFragment {
		let children: { [key: PropertyKey]: string | string[] } = {};
		let fragment = document.createElement('template');

		Object.entries(this.children).forEach(([key, value]) => {
			if (value instanceof Array) {
				children[key] = value.map((el) => this._createStub(el._id));
			} else {
				children[key] = this._createStub(value._id);
			}
		});

		fragment.innerHTML = tpl({ ...this.props, ...children }, ...data);

		Object.entries(this.children).forEach(([_, value]) => {
			if (value instanceof Array) {
				value.map((el) => {
					this._replaceStub(el._id, el, fragment.content);
				});
			} else {
				this._replaceStub(value._id, value, fragment.content);
			}
		});

		return fragment.content;
	}

	getContent(): HTMLElement {
		return this._element;
	}

	_makePropsProxy(props: Props): Props {
		let eventBus = this.eventBus;

		return new Proxy(props, {
			get: (target: Props, prop: PropertyKey): any => {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target: Props, prop: PropertyKey, value: any): boolean {
				target[prop] = value;
				eventBus.emit(Component.EVENTS.FLOW_CDU, { ...target }, target);
				return true;
			},
			deleteProperty(target: Props, prop: PropertyKey): boolean {
				delete target[prop];
				eventBus.emit(Component.EVENTS.FLOW_CDU, { ...target }, target);
				return true;
			},
		});
	}

	_createDocumentElement(tagName: string): HTMLElement {
		return document.createElement(tagName);
	}

	show() {
		this.getContent().classList.remove('hidden');
	}

	hide() {
		this.getContent().classList.add('hidden');
	}
}

export default Component;
