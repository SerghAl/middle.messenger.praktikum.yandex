import tpl from './edit_input.hbs';
import './edit_input.css';
import Component from '../../../../utils/component';

class EditInput extends Component {
	constructor(props: Props) {
		super('div', { ...props, attrs: { class: 'edit_input--container' } });
	}

	addEvents(): void {
		let input = this._element.querySelector('input');

		super.addEvents(input);
	}

	render() {
		return this.compile(tpl);
	}
}

export default EditInput;
