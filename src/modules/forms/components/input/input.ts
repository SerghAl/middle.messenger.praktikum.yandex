import tpl from './input.hbs';
import './input.css';
import Component from '../../../../utils/component';

class Input extends Component {
	constructor(props: { [key: PropertyKey]: any }) {
		let styles = 'input--container';

		if (props.attrs && props.attrs.class) {
			styles += props.attrs.class ? ` ${props.attrs.class}` : '';
		}

		super('div', {
			...props,
			attrs: { class: styles },
		});
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

			if (input) {
				let isValid = this.props.validator(input.value);

				if (!isValid.result) {
					this.setProps({ hint: isValid.error, value: input.value });
					return false;
				} else {
					this.setProps({ hint: false, value: input.value });
					return true;
				}
			}
		}
	}

	render() {
		return this.compile(tpl);
	}
}

export default Input;
