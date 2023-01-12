export const documentClassNameListener = (event, className, cb) => {
	document.addEventListener(event, (e) => {
		let lastTarget = e.target;

		while (lastTarget.parentNode !== null) {
			if (lastTarget.classList.contains(className)) {
				e.lastTarget = lastTarget;

				cb(e);
				return;
			} else {
				lastTarget = lastTarget.parentNode;
			}
		}
	});
};

export const documentDataAttrListener = (event, dataAttr, cb) => {
	document.addEventListener(event, (e) => {
		let lastTarget = e.target;

		while (lastTarget.parentNode !== null) {
			if (lastTarget.dataset[dataAttr]) {
				e.lastTarget = lastTarget;

				cb(e);
				return;
			} else {
				lastTarget = lastTarget.parentNode;
			}
		}
	});
};
