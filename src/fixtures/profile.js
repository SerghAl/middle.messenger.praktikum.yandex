import Form from '../modules/forms/forms';
import ImageForm from '../modules/forms/components/image_form';
import EditInput from '../modules/forms/components/edit_input';
import profileImage from '../../static/images/profile.png';
import Button from '../components/button';

export default {
	displayName: 'Иван',
	profileImageForm: ImageForm({
		method: 'POST',
		action: '/fakeapi/v1/profile',
		type: 'file',
		label: 'Аватар',
		name: 'avatar',
		value: profileImage,
	}),
	profileForm: Form({
		title: 'Личные данные',
		method: 'POST',
		action: '/fakeapi/v1/profile',
		controls: [Button({ title: 'Сохранить', type: 'primary' })],
		inputs: [
			EditInput({
				type: 'email',
				label: 'Почта',
				name: 'email',
				value: 'pochta@yandex.ru',
			}),
			EditInput({
				type: 'text',
				label: 'Логин',
				name: 'login',
				value: 'ivanivanov',
			}),
			EditInput({
				type: 'text',
				label: 'Имя',
				name: 'first_name',
				value: 'Иван',
			}),
			EditInput({
				type: 'text',
				label: 'Фамилия',
				name: 'second_name',
				value: 'Иванов',
			}),
			EditInput({
				type: 'text',
				label: 'Имя в чате',
				name: 'display_name',
				value: 'Иван',
			}),
			EditInput({
				type: 'tel',
				label: 'Телефон',
				name: 'phone',
				value: '+7 (909) 967 30 30',
			}),
		],
	}),
	profilePasswordForm: Form({
		title: 'Изменить пароль',
		method: 'POST',
		action: '/fakeapi/v1/profile',
		controls: [Button({ title: 'Сохранить', type: 'primary' })],
		inputs: [
			EditInput({
				type: 'password',
				label: 'Старый пароль',
				name: 'oldPassword',
				placeholder: '********',
			}),
			EditInput({
				type: 'password',
				label: 'Новый пароль',
				name: 'newPassword',
				placeholder: '********',
			}),
		],
	}),
};
