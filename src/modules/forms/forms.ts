import tpl from './forms.hbs';
import './forms.css';
import Component from '../../utils/component';

class Form extends Component {
	constructor(props: { [key: PropertyKey]: any }) {
		super('div', { ...props, attr: { class: 'form--container' } });
	}

	render() {
		return this.compile(tpl, this.props);
	}
}

export default Form;
