import tpl from './forms.hbs';
import './forms.css';
import Component from '../../utils/component';

class Form extends Component {
	constructor(props: { [key: PropertyKey]: any }) {
		super('div', { ...props, attr: { class: 'form--container' } });
	}

	addEvents(): void {
		let input = this._element.querySelector('form');
		if (input) {
			super.addEvents(input);
		}
	}

	render() {
		return this.compile(tpl, this.props);
	}
}

export default Form;
