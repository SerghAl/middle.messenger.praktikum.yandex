import EventBus from './event_bus';

type Props = {
	[key: PropertyKey]: any;
};

class Component {
	public eventBus;
	public props;

	private _meta: { tagName: string; props: Props };
	private _element: HTMLElement;

	static EVENTS: { [key: PropertyKey]: string } = {
		INIT: 'init',
		FLOW_CDM: 'flow:component-did-mount',
		FLOW_CDU: 'flow:component-did-update',
		FLOW_RENDER: 'flow:render',
	};

	constructor(tagName: string = 'div', props: Props = {}) {
		this._meta = {
			tagName,
			props,
		};

		this.props = this._makePropsProxy(props);

		this.eventBus = new EventBus();

		this._registerEvents();
		this.eventBus.emit(Component.EVENTS.INIT);
	}

	_registerEvents = (): void => {
		this.eventBus.on(Component.EVENTS.INIT, this.init);
		this.eventBus.on(Component.EVENTS.FLOW_CDM, this._componentDidMount);
		this.eventBus.on(Component.EVENTS.FLOW_CDU, this._componentDidUpdate);
		this.eventBus.on(Component.EVENTS.FLOW_RENDER, this._render);
	};

	_createComponent = (): void => {
		const { tagName } = this._meta;
		this._element = this._createDocumentElement(tagName);
	};

	init = (): void => {
		this._createComponent();

		this.eventBus.emit(Component.EVENTS.FLOW_RENDER);
	};

	_componentDidMount = (): void => {
		// this.componentDidMount();
	};

	componentDidMount = (oldProps: Props): void => {};

	dispatchComponentDidMount = (): void => {
		this.eventBus.emit(Component.EVENTS.FLOW_CDM);
	};

	_componentDidUpdate = (oldProps: Props, newProps: Props): void => {
		const response = this.componentDidUpdate(oldProps, newProps);
		if (!response) {
			return;
		}
		this._render();
	};

	componentDidUpdate = (oldProps: Props, newProps: Props): boolean => {
		return true;
	};

	setProps = (nextProps: Props): void => {
		if (!nextProps) {
			return;
		}

		Object.assign(this.props, nextProps);
	};

	get element(): HTMLElement {
		return this._element;
	}

	_render = (): void => {
		const component = this.render();
		this.removeEvents();
		this._element.innerHTML = component;
	};

	render = (): HTMLElement => {
		return;
	};

	getContent = (): HTMLElement => {
		return this.element;
	};

	_makePropsProxy = (props: Props): Props => {
		return new Proxy(props, {
			get: (target: Props, prop: PropertyKey): any => {
				const value = target[prop];
				return typeof value === 'function' ? value.bind(target) : value;
			},
			set(target: Props, prop: PropertyKey, value: any): boolean {
				target[prop] = value;

				this.eventBus.emit(Component.EVENTS.FLOW_CDU, { ...target }, target);
				return true;
			},
			deleteProperty(target: Props, prop: PropertyKey): boolean {
				throw new Error('Нет доступа');
			},
		});
	};

	_createDocumentElement = (tagName: string): HTMLElement => {
		return document.createElement(tagName);
	};

	show = (): void => {
		this.getContent().style.display = 'block';
	};

	hide = (): void => {
		this.getContent().style.display = 'none';
	};
}

export default Component;
