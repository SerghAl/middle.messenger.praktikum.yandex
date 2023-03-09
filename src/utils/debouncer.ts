export default function debounce(fn: Function, delay: number) {
	let timer: ReturnType<typeof setTimeout> | null;
	return (...args: unknown[]) => {
		if (timer) {
			clearTimeout(timer);
		}

		timer = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}
