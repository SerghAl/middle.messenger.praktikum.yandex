import Form from '../modules/forms/forms';
import Input from '../modules/forms/components/input';
import Button from '../components/button';
import TextButton from '../components/text_button';
import {
	checkLogin,
	checkMail,
	checkName,
	checkPassword,
	checkPhone,
} from '../utils/validation';
import AuthAPI from '../api/auth_api';
import { Router } from '../utils/Router';
import { setUserInfo } from '../utils/Store/Actions';

let router = new Router('.app');

let emailInput = new Input({
	type: 'email',
	label: 'Почта',
	name: 'email',
	placeholder: 'pochta@yandex.ru',
	validator: checkMail,
	events: {
		blur: (): void => {
			emailInput.checkValidation();
		},
	},
});

let loginInput = new Input({
	type: 'text',
	label: 'Логин',
	name: 'login',
	placeholder: 'ivanivanov',
	validator: checkLogin,
	events: {
		blur: (): void => {
			loginInput.checkValidation();
		},
	},
});

let firstNameInput = new Input({
	type: 'text',
	label: 'Имя',
	name: 'first_name',
	placeholder: 'Иван',
	validator: checkName,
	events: {
		blur: (): void => {
			firstNameInput.checkValidation();
		},
	},
});

let secondNameInput = new Input({
	type: 'text',
	label: 'Фамилия',
	name: 'second_name',
	placeholder: 'Иванов',
	validator: checkName,
	events: {
		blur: (): void => {
			secondNameInput.checkValidation();
		},
	},
});

let phoneInput = new Input({
	type: 'tel',
	label: 'Телефон',
	name: 'phone',
	placeholder: '89099673030',
	validator: checkPhone,
	events: {
		blur: (): void => {
			phoneInput.checkValidation();
		},
	},
});

let passwordInput = new Input({
	type: 'password',
	label: 'Пароль',
	name: 'password',
	validator: checkPassword,
	events: {
		blur: (): void => {
			passwordInput.checkValidation();
		},
	},
});

let repeatPasswordInput = new Input({
	type: 'password',
	label: 'Пароль (ещё раз)',
	name: 'password',
	validator: checkPassword,
	events: {
		blur: (): void => {
			repeatPasswordInput.checkValidation();
		},
	},
});

let regFormSettings: Props = {
	size: 's',
	innerTitle: 'Регистрация',
	method: 'POST',
	action: '/fakeapi/v1/profile',
	controls: [
		new Button({
			title: 'Зарегистрироваться',
			type: 'primary',
			size: 'full',
			data: { key: 'href', value: 'messenger' },
		}),
		new TextButton({
			title: 'Войти',
			type: 'primary',
			size: 'full',
			data: { key: 'href', value: '' },
			events: {
				click: (e: Event): void => {
					e.preventDefault();
					let target = <HTMLElement>e.currentTarget;
					router.go(`/${target?.dataset?.href}`);
				},
			},
		}),
	],
	inputs: [
		emailInput,
		loginInput,
		firstNameInput,
		secondNameInput,
		phoneInput,
		passwordInput,
		repeatPasswordInput,
	],
	events: {
		submit: (e: Event): void => {
			e.preventDefault();

			let isValid = true;

			regFormSettings.inputs.forEach((input: Input) => {
				if (!input.checkValidation()) isValid = false;
			});

			if (!isValid) return;

			let formData = new FormData(<HTMLFormElement>e.target);
			let data = Object.fromEntries(formData.entries());

			AuthAPI.signUp(data)
				.then(({ response }) => {
					console.log(JSON.parse(response));
					return AuthAPI.signIn({ login: data.login, password: data.password });
				})
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
};

export default {
	regForm: new Form(regFormSettings),
};
