import ImageForm from './image_form.hbs';
import './image_form.css';

import { documentClassNameListener } from '../../../../utils/listener';

export default ImageForm;

documentClassNameListener('change', 'image_form', (e) => {
	e.preventDefault();

	let preview = document.querySelector('.image_form--img');
	preview.src = URL.createObjectURL(e.target.files[0]);
});
