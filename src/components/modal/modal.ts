import tpl from './modal.hbs';
import './modal.css';
import Component from '../../utils/component';

class Modal extends Component {
	constructor(props: { [key: PropertyKey]: any }) {
		let styles = 'modal';

		super('div', { ...props, attrs: { class: styles } });
	}

	addEvents(): void {
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
