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
import UserAPI from '../api/user_api';
import Store from '../utils/Store/Store';
import { setUserInfo } from '../utils/Store/Actions';
import { connect } from '../utils/Store';
import { BASE_URL } from '../settings/constants';

export default function getProfileData(userInfo: any) {
	let store = new Store();
	let router = new Router('.app');

	let firstNameInput = new EditInput({
		type: 'text',
		label: 'Имя',
		name: 'first_name',
		value: userInfo.first_name || '',
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
		value: userInfo.second_name || '',
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
		name: 'email',
		value: userInfo.email || '',
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
		value: userInfo.login || '',
		validator: checkLogin,
		events: {
			blur: (): void => {
				loginInput.checkValidation();
			},
		},
	});

	let EditInputClass = connect(EditInput, (store: TStore) => {
		return {
			value: store.userInfo?.display_name,
		};
	});

	let displayNameInput = new EditInputClass({
		type: 'text',
		label: 'Имя в чате',
		name: 'display_name',
		value: userInfo.display_name || '',
	});

	let phoneInput = new EditInput({
		type: 'tel',
		label: 'Телефон',
		name: 'phone',
		value: userInfo.phone || '',
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

				let formIsValid = true;

				profileFormSettings.inputs.forEach((input: EditInput) => {
					formIsValid = input.checkValidation();
				});

				if (!formIsValid) {
					return;
				}

				let formData = new FormData(<HTMLFormElement>e.target);

				UserAPI.changePassword(Object.fromEntries(formData.entries())).then(
					({ response }) => {
						console.log(response);
					}
				);

				console.log('Password form: ', Object.fromEntries(formData.entries()));
			},
		},
		controls: [
			new Button({
				title: 'Сохранить',
				type: 'primary',
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
			}),
		],
		events: {
			submit: (e: Event): void => {
				e.preventDefault();

				let formIsValid = true;

				profileFormSettings.inputs.forEach((input: EditInput) => {
					formIsValid = input.checkValidation();
				});

				if (!formIsValid) {
					return;
				}

				let formData = new FormData(<HTMLFormElement>e.target);

				UserAPI.changeProfile(Object.fromEntries(formData.entries()))
					.then(({ response }) => {
						setUserInfo(JSON.parse(response));
					})
					.catch((error) => {
						console.log(error);
					});

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

	let profileImageFormClass = connect(ImageForm, (store: TStore) => {
		return {
			value: `${BASE_URL}/resources${store.userInfo?.avatar}`,
		};
	});
	let profileImageForm = new profileImageFormClass({
		method: 'POST',
		action: '/fakeapi/v1/profile',
		type: 'file',
		label: 'Аватар',
		name: 'avatar',
		value:
			userInfo && userInfo.avatar
				? `${BASE_URL}/resources${userInfo.avatar}`
				: profileImage,
		events: {
			change: (e: Event) => {
				e.preventDefault();
				let target = <HTMLElement>e.currentTarget;
				let formData = new FormData(
					<HTMLFormElement>target?.parentNode?.parentNode
				);

				UserAPI.changeAvatar(formData)
					.then(({ response }) => {
						setUserInfo(JSON.parse(response));
					})
					.catch((error) => {
						console.log(error);
					});
			},
		},
	});

	return {
		backBtn: new FullheightButton({
			events: {
				click: (e: Event): void => {
					e.preventDefault();
					let target = <HTMLElement>e.currentTarget;
					router.go(`/${target?.dataset.href}`);
				},
			},
			attrs: {
				href: '/messenger',
				'data-href': 'messenger',
			},
		}),
		displayName: userInfo.display_name || '',
		profileImageForm,
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
}
