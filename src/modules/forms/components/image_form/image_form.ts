import tpl from './image_form.hbs';
import './image_form.css';

import Component from '../../../../utils/component';

class ImageForm extends Component {
	constructor(props: Props) {
		super('form', {
			...props,
			attrs: {
				class: 'image_form',
				events: {
					change: (e: Event) => {
						e.preventDefault();

						let preview = <HTMLImageElement>(
							document.querySelector('.image_form--img')
						);
						if (preview) {
							preview.src = URL.createObjectURL(this._element.files[0]);
						}
					},
				},
			},
		});
	}

	render() {
		return this.compile(tpl);
	}
}

export default ImageForm;
