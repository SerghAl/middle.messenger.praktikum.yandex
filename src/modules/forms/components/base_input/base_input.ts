import tpl from './base_input.hbs';
import './base_input.css';
import Component from '../../../../utils/component';

class BaseInput extends Component {
	constructor(props: Props) {
		let styles = 'base_input';

		if (props.attrs && props.attrs.class) {
			styles += props.attrs.class ? ` ${props.attrs.class}` : '';
		}

		super(
			{
				...props,
				attrs: { ...props.attrs, class: styles },
			},
			'input'
		);
	}

	checkValidation() {
		if (this.props.validator) {
			let input = <HTMLInputElement>this.getContent();

			let isValid = this.props.validator(input.value);

			if (!isValid.result) {
				this.setProps({
					attrs: { placeholder: isValid.error },
				});
				return false;
			} else {
				this.setProps({ value: input.value });
				return true;
			}
		}
	}

	render() {
		return this.compile(tpl);
	}
}

export default BaseInput;
