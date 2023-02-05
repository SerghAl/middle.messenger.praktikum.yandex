class EventBus {
	private listeners: { [key: string]: Function[] };

	constructor() {
		this.listeners = {};
	}

	on = (eventName: string, callback: Function): void => {
		if (!this.listeners[eventName]) {
			this.listeners[eventName] = [];
		}

		this.listeners[eventName].push(callback);
	};

	off = (eventName: string, callback: Function): void => {
		if (!this.listeners[eventName]) {
			throw new Error(`Нет события: ${eventName}`);
		}

		this.listeners[eventName] = this.listeners[eventName].filter(
			(listener) => listener !== callback
		);
	};

	emit = (eventName: string, ...args: any): void => {
		if (!this.listeners[eventName]) {
			throw new Error(`Нет события: ${eventName}`);
		}

		this.listeners[eventName].forEach(function (listener) {
			listener(...args);
		});
	};
}

export default EventBus;
