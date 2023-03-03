import tpl from './modal.hbs';
import './modal.css';
import Component from '../../utils/component';

class Modal extends Component {
	constructor(props: { [key: PropertyKey]: any }) {
		let styles = 'modal';

		super('div', { ...props, attrs: { class: styles } });
	}

	addEvents(): void {
		let closeBtn = this._element.querySelector('.modal--close');
		closeBtn?.addEventListener('click', (e) => {
			e.preventDefault();
			let parent = this._element.parentNode;
			parent?.removeChild(this._element);

			if (parent?.tagName === 'FORM') {
				let inputs = Array.from(parent.elements);
				inputs.forEach((input: HTMLInputElement) => (input.value = ''));
			}
		});

		let inputs = Array.from(this._element.querySelectorAll('.modal--item'));
		if (inputs) {
			inputs.forEach((input: HTMLElement) => super.addEvents(input));
		}
	}

	render() {
		return this.compile(tpl);
	}
}

export default Modal;
