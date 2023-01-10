import Form from '../modules/forms/forms';
import Input from '../modules/forms/components/input';
import Button from '../components/button';
import TextButton from '../components/text_button';

export default {
	authForm: Form({
		size: 's',
		height: 'm',
		innerTitle: 'Вход',
		method: 'POST',
		action: '/fakeapi/v1/profile',
		controls: [
			Button({
				title: 'Войти',
				type: 'primary',
				size: 'full',
				data: { key: 'href', value: 'chat' },
			}),
			TextButton({
				title: 'Нет аккаунта?',
				type: 'primary',
				size: 'full',
				data: { key: 'href', value: 'registration' },
			}),
		],
		inputs: [
			Input({
				type: 'text',
				label: 'Логин',
				name: 'login',
				value: 'ivanivanov',
			}),
			Input({
				type: 'password',
				label: 'Пароль',
				name: 'password',
				value: '••••••••••••',
			}),
		],
	}),
};
