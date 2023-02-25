import tpl from './image_form.hbs';
import './image_form.css';
import Component from '../../../../utils/component';

class ImageForm extends Component {
	constructor(props: Props) {
		super('form', {
			...props,
			attrs: {
				class: 'image_form',
			},
		});
	}

	addEvents(): void {
		let input = this._element.querySelector('input');
		if (input) {
			super.addEvents(input);
		}
	}

	render() {
		return this.compile(tpl, this.props);
	}
}

export default ImageForm;
