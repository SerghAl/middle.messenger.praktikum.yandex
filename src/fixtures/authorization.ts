import Form from '../modules/forms/forms';
import Input from '../modules/forms/components/input';
import Button from '../components/button';
import TextButton from '../components/text_button';
import { checkLogin, checkPassword } from '../utils/validation';

let loginInput = new Input({
	type: 'text',
	label: 'Логин',
	name: 'login',
	value: 'ivanivanov',
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
	value: '••••••••••••',
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
	action: '/fakeapi/v1/profile',
	events: {
		submit: (e: Event): void => {
			e.preventDefault();
			authFormSettings.inputs.forEach((input: Input) => {
				input.checkValidation();
			});

			let formData = new FormData(<HTMLFormElement>e.target);

			console.log('Auth form: ', Object.fromEntries(formData.entries()));
		},
	},
	controls: [
		new Button({
			attrs: {
				'data-href': 'chat',
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
			data: { key: 'href', value: 'registration' },
		}),
	],
	inputs: [loginInput, passwordInput],
};

export default {
	authForm: new Form(authFormSettings),
};
