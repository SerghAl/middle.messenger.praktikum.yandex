import tpl from './forms.hbs';
import './forms.css';
import Component from '../../utils/component';

class Form extends Component {
	constructor(props: Props) {
		super({ ...props, attr: { class: 'form--container' } }, 'div');
	}

	addEvents(): void {
		let input = this.getContent().querySelector('form');
		if (input) {
			super.addEvents(input);
		}
	}

	render() {
		return this.compile(tpl, this.props);
	}
}

export default Form;
