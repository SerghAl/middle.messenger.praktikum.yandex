import Form from '../modules/forms/forms';
import Input from '../modules/forms/components/input';
import Button from '../components/button';
import TextButton from '../components/text_button';

let formBtn = new Button({
	events: {
		click: (e: Event) => {
			e.preventDefault();
			console.log('authorization');
		},
	},
	attrs: {
		'data-href': 'chat',
		class: 'btn',
	},
	type: 'primary',
	size: 'full',
	title: 'Войти',
});

export default {
	authForm: new Form({
		size: 's',
		height: 'm',
		innerTitle: 'Вход',
		method: 'POST',
		action: '/fakeapi/v1/profile',
		formBtn,
		regBtn: new TextButton({
			title: 'Нет аккаунта?',
			type: 'primary',
			size: 'full',
			data: { key: 'href', value: 'registration' },
		}),
		inputs: [
			new Input({
				type: 'text',
				label: 'Логин',
				name: 'login',
				value: 'ivanivanov',
			}),
			new Input({
				type: 'password',
				label: 'Пароль',
				name: 'password',
				value: '••••••••••••',
			}),
		],
	}),
};
