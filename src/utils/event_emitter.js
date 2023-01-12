class EventEmitter {
	constructor() {
		this.events = {};
	}

	subscribe = (event, cb) => {
		if (this.events[event]) {
			this.events[event].push(cb);
		} else {
			this.events[event] = [cb];
		}
	};

	emit = (event, data) => {
		event = this.events[event];

		if (event) {
			event.forEach((cb) => {
				cb(data);
			});
		}
	};
}

export default EventEmitter;
