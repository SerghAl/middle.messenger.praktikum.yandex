import Form from '../modules/forms/forms';
import ImageForm from '../modules/forms/components/image_form';
import EditInput from '../modules/forms/components/edit_input';
import profileImage from '../../static/images/profile.png';
import Button from '../components/button';
import FullheightButton from '../components/fullheight_button';
import { getRoute } from '../utils/router';
import { checkCyrillicAndLat } from '../utils/validation';

export default {
	backBtn: new FullheightButton({
		events: {
			click: (e: Event) => {
				getRoute(e);
			},
		},
	}),
	displayName: 'Иван',
	profileImageForm: new ImageForm({
		method: 'POST',
		action: '/fakeapi/v1/profile',
		type: 'file',
		label: 'Аватар',
		name: 'avatar',
		value: profileImage,
	}),
	profileForm: new Form({
		title: 'Личные данные',
		method: 'POST',
		action: '/fakeapi/v1/profile',
		controls: [
			new Button({
				title: 'Сохранить',
				type: 'primary',
				data: { key: 'href', value: 'unfound' },
			}),
		],
		inputs: [
			new EditInput({
				type: 'email',
				label: 'Почта',
				name: 'email',
				value: 'pochta@yandex.ru',
			}),
			new EditInput({
				type: 'text',
				label: 'Логин',
				name: 'login',
				value: 'ivanivanov',
			}),
			new EditInput({
				type: 'text',
				label: 'Имя',
				name: 'first_name',
				value: 'Иван',
				events: {
					blur: (e: Event) => {
						let isValid = checkCyrillicAndLat(e.target.value);

						if (!isValid) {
							console.log('Fail validation');
						}
					},
					focus: (e: Event) => {
						console.log('!!');
					},
					click: (e) => {
						console.log('33');
					},
				},
			}),
			new EditInput({
				type: 'text',
				label: 'Фамилия',
				name: 'second_name',
				value: 'Иванов',
			}),
			new EditInput({
				type: 'text',
				label: 'Имя в чате',
				name: 'display_name',
				value: 'Иван',
			}),
			new EditInput({
				type: 'tel',
				label: 'Телефон',
				name: 'phone',
				value: '+7 (909) 967 30 30',
			}),
		],
	}),
	profilePasswordForm: new Form({
		title: 'Изменить пароль',
		method: 'POST',
		action: '/fakeapi/v1/profile',
		controls: [
			new Button({
				title: 'Сохранить',
				type: 'primary',
				data: { key: 'href', value: 'error' },
			}),
		],
		inputs: [
			new EditInput({
				type: 'password',
				label: 'Старый пароль',
				name: 'oldPassword',
				placeholder: '********',
			}),
			new EditInput({
				type: 'password',
				label: 'Новый пароль',
				name: 'newPassword',
				placeholder: '********',
			}),
		],
	}),
};
