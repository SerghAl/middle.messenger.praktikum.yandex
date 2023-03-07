import tpl from './modal.hbs';
import './modal.css';
import Component from '../../utils/component';

class Modal extends Component {
	constructor(props: Props) {
		let styles = 'modal';

		super({ ...props, attrs: { class: styles } }, 'div');
	}

	addEvents(): void {
		let closeBtn = this.getContent().querySelector('.modal--close');
		closeBtn?.addEventListener('click', (e) => {
			e.preventDefault();
			let parent = <HTMLFormElement>this.getContent().parentNode;
			parent?.removeChild(this.getContent());

			if (parent?.tagName === 'FORM') {
				let inputs = Array.from(parent.elements);
				inputs.forEach((input: HTMLInputElement) => (input.value = ''));
			}
		});

		let inputs = Array.from(this.getContent().querySelectorAll('.modal--item'));
		if (inputs) {
			inputs.forEach((input: HTMLElement) => super.addEvents(input));
		}
	}

	render() {
		return this.compile(tpl);
	}
}

export default Modal;
