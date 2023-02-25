export default function debounce(fn: Function, delay: number) {
	let timer: null | Function = null;
	return (...args) => {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}
