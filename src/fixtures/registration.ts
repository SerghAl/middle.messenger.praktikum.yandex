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

let emailInput = new Input({
	type: 'email',
	label: 'Почта',
	name: 'email',
	value: 'pochta@yandex.ru',
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
	value: 'ivanivanov',
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
	value: 'Иван',
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
	value: 'Иванов',
	validator: checkName,
	events: {
		blur: (): void => {
			secondNameInput.checkValidation();
		},
	},
});

let chatNameInput = new Input({
	type: 'text',
	label: 'Имя в чате',
	name: 'display_name',
	value: 'Иван',
});

let phoneInput = new Input({
	type: 'tel',
	label: 'Телефон',
	name: 'phone',
	value: '+7 (909) 967 30 30',
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
	value: '••••••••••••',
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
	value: '••••••••••••',
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
			data: { key: 'href', value: 'chat' },
		}),
		new TextButton({
			title: 'Войти',
			type: 'primary',
			size: 'full',
			data: { key: 'href', value: 'authorization' },
		}),
	],
	inputs: [
		emailInput,
		loginInput,
		firstNameInput,
		secondNameInput,
		chatNameInput,
		phoneInput,
		passwordInput,
		repeatPasswordInput,
	],
	events: {
		submit: (e: Event): void => {
			e.preventDefault();
			regFormSettings.inputs.forEach((input: Input) => {
				input.checkValidation();
			});

			let formData = new FormData(<HTMLFormElement>e.target);

			console.log(
				'Registration form: ',
				Object.fromEntries(formData.entries())
			);
		},
	},
};

export default {
	regForm: new Form(regFormSettings),
};
