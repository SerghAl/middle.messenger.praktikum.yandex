import Form from '../modules/forms/forms';
import ImageForm from '../modules/forms/components/image_form';
import EditInput from '../modules/forms/components/edit_input';
import profileImage from '../../static/images/profile.png';
import Button from '../components/button';
import FullheightButton from '../components/fullheight_button';

import {
	checkName,
	checkLogin,
	checkMail,
	checkPassword,
	checkPhone,
} from '../utils/validation';
import { Router } from '../utils/Router/index';
import AuthAPI from '../api/auth_api';
import { getUserInfo } from '../utils/Store/Actions';
import Store from '../utils/Store/Store';

let store = new Store();
let router = new Router('.app');

let userInfo = getUserInfo();
console.log(userInfo);

let firstNameInput = new EditInput({
	type: 'text',
	label: 'Имя',
	name: 'first_name',
	value: userInfo.first_name,
	validator: checkName,
	events: {
		blur: (): void => {
			firstNameInput.checkValidation();
		},
	},
});

let secondNameInput = new EditInput({
	type: 'text',
	label: 'Фамилия',
	name: 'second_name',
	value: userInfo.second_name,
	validator: checkName,
	events: {
		blur: (): void => {
			secondNameInput.checkValidation();
		},
	},
});

let emailInput = new EditInput({
	type: 'email',
	label: 'Почта',
	name: userInfo.email,
	value: 'pochta@yandex.ru',
	validator: checkMail,
	events: {
		blur: (): void => {
			emailInput.checkValidation();
		},
	},
});

let loginInput = new EditInput({
	type: 'text',
	label: 'Логин',
	name: 'login',
	value: userInfo.login,
	validator: checkLogin,
	events: {
		blur: (): void => {
			loginInput.checkValidation();
		},
	},
});

let displayNameInput = new EditInput({
	type: 'text',
	label: 'Имя в чате',
	name: 'display_name',
	value: 'Иван',
});

let phoneInput = new EditInput({
	type: 'tel',
	label: 'Телефон',
	name: 'phone',
	value: userInfo.phone,
	validator: checkPhone,
	events: {
		blur: (): void => {
			phoneInput.checkValidation();
		},
	},
});

let oldPasswordInput = new EditInput({
	type: 'password',
	label: 'Старый пароль',
	name: 'oldPassword',
	placeholder: '********',
	validator: checkPassword,
	events: {
		blur: (): void => {
			oldPasswordInput.checkValidation();
		},
	},
});

let newPasswordInput = new EditInput({
	type: 'password',
	label: 'Новый пароль',
	name: 'newPassword',
	placeholder: '********',
	validator: checkPassword,
	events: {
		blur: (): void => {
			newPasswordInput.checkValidation();
		},
	},
});

let profilePasswordFormSettings = {
	title: 'Изменить пароль',
	method: 'POST',
	action: '/fakeapi/v1/profile',
	events: {
		submit: (e: Event): void => {
			e.preventDefault();
			profilePasswordFormSettings.inputs.forEach((input) => {
				input.checkValidation();
			});

			let formData = new FormData(<HTMLFormElement>e.target);

			console.log('Password form: ', Object.fromEntries(formData.entries()));
		},
	},
	controls: [
		new Button({
			title: 'Сохранить',
			type: 'primary',
			data: { key: 'href', value: 'error' },
		}),
	],
	inputs: [oldPasswordInput, newPasswordInput],
};

let profileFormSettings = {
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
	events: {
		submit: (e: Event): void => {
			e.preventDefault();
			profileFormSettings.inputs.forEach((input) => {
				input.checkValidation();
			});

			let formData = new FormData(<HTMLFormElement>e.target);

			console.log('Profile form: ', Object.fromEntries(formData.entries()));
		},
	},
	inputs: [
		emailInput,
		loginInput,
		firstNameInput,
		secondNameInput,
		displayNameInput,
		phoneInput,
	],
};

export default {
	backBtn: new FullheightButton({
		events: {
			click: (e: Event): void => {
				e.preventDefault();
				router.go(`/${e.target.dataset.href}`);
			},
		},
		attrs: {
			href: '/chat',
			'data-href': 'chat',
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
	profileForm: new Form(profileFormSettings),
	profilePasswordForm: new Form(profilePasswordFormSettings),
	logoutBtn: new Button({
		title: 'Выйти из профиля',
		type: 'accent',
		events: {
			click: (e: Event) => {
				e.preventDefault();

				AuthAPI.logOut().then(() => {
					store.removeState();
					router.go('/');
				});
			},
		},
	}),
};
