import Form from '../modules/forms/forms';
import Input from '../modules/forms/components/input';
import Button from '../components/button';
import TextButton from '../components/text_button';

export default {
	regForm: Form({
		size: 's',
		innerTitle: 'Регистрация',
		method: 'POST',
		action: '/fakeapi/v1/profile',
		controls: [
			Button({
				title: 'Зарегистрироваться',
				type: 'primary',
				size: 'full',
				data: { key: 'href', value: 'chat' },
			}),
			TextButton({
				title: 'Войти',
				type: 'primary',
				size: 'full',
				data: { key: 'href', value: 'authorization' },
			}),
		],
		inputs: [
			Input({
				type: 'email',
				label: 'Почта',
				name: 'email',
				value: 'pochta@yandex.ru',
			}),
			Input({
				type: 'text',
				label: 'Логин',
				name: 'login',
				value: 'ivanivanov',
			}),
			Input({
				type: 'text',
				label: 'Имя',
				name: 'first_name',
				value: 'Иван',
			}),
			Input({
				type: 'text',
				label: 'Фамилия',
				name: 'second_name',
				value: 'Иванов',
			}),
			Input({
				type: 'text',
				label: 'Имя в чате',
				name: 'display_name',
				value: 'Иван',
			}),
			Input({
				type: 'tel',
				label: 'Телефон',
				name: 'phone',
				value: '+7 (909) 967 30 30',
			}),
			Input({
				type: 'password',
				label: 'Пароль',
				name: 'password',
				value: '••••••••••••',
				error: true,
			}),
			Input({
				type: 'password',
				label: 'Пароль (ещё раз)',
				name: 'password',
				value: '••••••••••••',
				hint: 'Пароли не совпадают',
				error: true,
			}),
		],
	}),
};
