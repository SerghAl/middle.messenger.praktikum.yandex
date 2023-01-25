export const documentClassNameListener = (
	eventName: string,
	className: string,
	cb: Function
): void => {
	document.addEventListener(eventName, (e: Event) => {
		let lastTarget = e.target;

		if (lastTarget) {
			while (lastTarget.parentNode !== null) {
				if (lastTarget.classList.contains(className)) {
					Object.assign(e, { lastTarget });

					cb(e);
					return;
				} else {
					lastTarget = <HTMLElement>lastTarget.parentNode;
				}
			}
		}
	});
};

export const documentDataAttrListener = (
	eventName: string,
	dataAttr: string,
	cb: Function
) => {
	document.addEventListener(eventName, (e) => {
		let lastTarget = <HTMLElement>e.target;

		while (lastTarget.parentNode !== null) {
			if (lastTarget.dataset[dataAttr]) {
				Object.assign(e, { lastTarget });
				cb(e);
				return;
			} else {
				lastTarget = <HTMLElement>lastTarget.parentNode;
			}
		}
	});
};
