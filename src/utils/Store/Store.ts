import EventBus from '../event_bus';

export default class Store extends EventBus {
	static EVENTS = {
		UPDATE: '',
	};
	static _instance: Store | null;
	static STORE_NAME = 'globalStore';

	_state: { [key: string]: any } = {};

	constructor() {
		if (Store._instance) {
			return Store._instance;
		}

		super();

		const savedState = localStorage.getItem(Store.STORE_NAME);

		this._state = savedState ? JSON.parse(savedState) : {};

		Store._instance = this;

		this.on(Store.EVENTS.UPDATE, () => {
			localStorage.setItem(Store.STORE_NAME, JSON.stringify(this._state));
		});
	}

	getState() {
		return this._state;
	}

	removeState() {
		this._state = {};
		this.emit(Store.EVENTS.UPDATE);
	}

	set(key: string, value: any) {
		this._state[key] = value;
		this.emit(Store.EVENTS.UPDATE);
		return this;
	}
}
