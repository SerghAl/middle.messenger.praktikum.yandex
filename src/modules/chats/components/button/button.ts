import tpl from './button.hbs';
import './button.css';
import Component from '../../../../utils/component';

class TextArrowButton extends Component {
	constructor(props: Props) {
		super('a', { ...props });
	}

	render() {
		return this.compile(tpl);
	}
}

export default TextArrowButton;
