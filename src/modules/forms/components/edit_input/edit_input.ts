import tpl from './edit_input.hbs';
import './edit_input.css';
import Component from '../../../../utils/component';

class EditInput extends Component {
	constructor(props: Props) {
		super('div', { ...props, attrs: { class: 'edit_input--container' } });
	}

	addEvents(): void {
		let input = this._element.querySelector('input');
		if (input) {
			super.addEvents(input);
		}
	}

	checkValidation() {
		if (this.props.validator) {
			let input = this._element.querySelector('input');

			let isValid = this.props.validator(input.value);

			if (!isValid.result) {
				this.setProps({ hint: isValid.error, value: input.value });
			} else {
				this.setProps({ hint: false, value: input.value });
			}
		}
	}

	render() {
		return this.compile(tpl);
	}
}

export default EditInput;
