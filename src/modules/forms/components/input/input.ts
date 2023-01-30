import tpl from './input.hbs';
import './input.css';
import Component from '../../../../utils/component';

class Input extends Component {
	constructor(props: { [key: PropertyKey]: any }) {
		super('div', { ...props, attrs: { class: 'input--container' } });
	}

	render() {
		return this.compile(tpl);
	}
}

export default Input;
