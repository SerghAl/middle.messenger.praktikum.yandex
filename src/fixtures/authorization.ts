import Form from '../modules/forms/forms';
import Input from '../modules/forms/components/input';
import Button from '../components/button';
import TextButton from '../components/text_button';

export default {
	authForm: new Form({
		size: 's',
		height: 'm',
		innerTitle: 'Вход',
		method: 'POST',
		action: '/fakeapi/v1/profile',
		controls: [
			new Button({
				events: {
					click: (e: Event) => {
						e.preventDefault();
					},
				},
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
				events: {
					click: (e: Event) => {
						e.preventDefault();
					},
				},
			}),
		],
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
