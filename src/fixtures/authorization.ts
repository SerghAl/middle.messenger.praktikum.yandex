import Form from '../modules/forms/forms';
import Input from '../modules/forms/components/input';
import Button from '../components/button';
import TextButton from '../components/text_button';
import { checkLogin, checkPassword } from '../utils/validation';
import AuthAPI from '../api/auth_api';
import { setUserInfo } from '../utils/Store/Actions';
import { Router } from '../utils/Router';

let router = new Router('.app');

let loginInput = new Input({
	type: 'text',
	label: 'Логин',
	name: 'login',
	value: '',
	validator: checkLogin,
	events: {
		blur: (): void => {
			loginInput.checkValidation();
		},
	},
});

let passwordInput = new Input({
	type: 'password',
	label: 'Пароль',
	name: 'password',
	value: '',
	validator: checkPassword,
	events: {
		blur: (): void => {
			passwordInput.checkValidation();
		},
	},
});

let authFormSettings: Props = {
	size: 's',
	height: 'm',
	innerTitle: 'Вход',
	method: 'POST',
	action: '/',
	events: {
		submit: (e: Event): void => {
			e.preventDefault();
			let isValid = true;

			authFormSettings.inputs.forEach((input: Input) => {
				if (!input.checkValidation()) isValid = false;
			});

			if (!isValid) return;

			let formData = new FormData(<HTMLFormElement>e.target);

			AuthAPI.signIn(Object.fromEntries(formData.entries()))
				.then(() => {
					return AuthAPI.getUserInfo();
				})
				.then(({ response }: Props) => {
					setUserInfo(JSON.parse(response));
					router.go('/messenger');
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
	controls: [
		new Button({
			attrs: {
				'data-href': 'messenger',
				class: 'btn',
			},
			type: 'primary',
			size: 'full',
			title: 'Войти',
		}),
		new TextButton({
			title: 'Нет аккаунта?',
			type: 'primary',
			size: 'full',
			attrs: {
				'data-href': 'sign-up',
			},
			events: {
				click: (e: Event): void => {
					e.preventDefault();
					router.go(`/${e.currentTarget?.dataset.href}`);
				},
			},
		}),
	],
	inputs: [loginInput, passwordInput],
};

export default {
	authForm: new Form(authFormSettings),
};
