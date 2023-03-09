import tpl from './image_form.hbs';
import './image_form.css';
import Component from '../../../../utils/component';

class ImageForm extends Component {
	constructor(props: Props) {
		super(
			{
				...props,
				attrs: {
					...props.attrs,
					class: props.attrs?.class
						? `image_form ${props.attrs.class}`
						: 'image_form',
				},
			},
			'form'
		);
	}

	addEvents(): void {
		let input = this.getContent().querySelector('input');
		if (input) {
			super.addEvents(input);
		}
	}

	render() {
		return this.compile(tpl, this.props);
	}
}

export default ImageForm;
