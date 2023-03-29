import {
	checkName,
	checkLogin,
	checkMail,
	checkMessage,
	checkPassword,
	checkPhone,
} from './validation';

describe('Валидация имени пользователя', () => {
	let successAnswer = { result: true };
	let errorAnswer = {
		result: false,
		error:
			'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
	};

	test('Валидация верного имени пользователя', () => {
		expect(checkName('Holly-Dolly')).toEqual(successAnswer);
	});

	test('Валидация неправильного имени пользователя', () => {
		expect(checkName('hollyDolly')).toEqual(errorAnswer);
		expect(checkName('Holly Dolly')).toEqual(errorAnswer);
		expect(checkName('Holly_Dolly')).toEqual(errorAnswer);
	});
});

describe('Провекра логина', () => {
	let successResult = {
		result: true,
	};

	let errorResult = {
		result: false,
		error:
			'От 3 до 20 символов, латиница, может содержать цифры, но не состоять из них, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание).',
	};

	test('Проверка правильного логина', () => {
		expect(checkLogin('Ad3')).toEqual(successResult);
		expect(checkLogin('adminadminadmina-_20')).toEqual(successResult);
	});

	test('Проверка неправильного логина', () => {
		expect(checkLogin('A2')).toEqual(errorResult);
		expect(checkLogin('123')).toEqual(errorResult);
		expect(checkLogin('Ad#')).toEqual(errorResult);
		expect(checkLogin('Ad min')).toEqual(errorResult);
		expect(checkLogin('Adminadminadminadmi21')).toEqual(errorResult);
		expect(checkLogin('Админ')).toEqual(errorResult);
	});
});

describe('Проверка почты', () => {
	let successResult = {
		result: true,
	};

	let errorResult = {
		result: false,
		error:
			'Латиница, может включать цифры и спецсимволы вроде дефиса, обязательно должна быть «собака» (@) и точка после неё, но перед точкой обязательно должны быть буквы.',
	};

	test('Проверка правильного email', () => {
		expect(checkMail('correct-3@mail.ru')).toEqual(successResult);
	});

	test('Проверка неправильного email', () => {
		expect(checkMail('почта@mail.ru')).toEqual(errorResult);
		expect(checkMail('la*@mail.ru')).toEqual(errorResult);
		expect(checkMail('mail@.ru')).toEqual(errorResult);
		expect(checkMail('mail@ru')).toEqual(errorResult);
		expect(checkMail('mail@.ru')).toEqual(errorResult);
	});
});

describe('Проверка сообщения', () => {
	let successResult = {
		result: true,
	};

	let errorAnswer = {
		result: false,
		error: 'Не должно быть пустым',
	};

	test('Проверка правильного сообщения', () => {
		expect(checkMessage('Правильное сообщения')).toEqual(successResult);
	});

	test('Проверка неправильного сообщения', () => {
		expect(checkMessage('')).toEqual(errorAnswer);
	});
});

describe('Проверка номера телефона', () => {
	let successResult = {
		result: true,
	};

	let errorAnswer = {
		result: false,
		error: 'От 10 до 15 символов, состоит из цифр, может начинается с плюса.',
	};

	test('Проверка правильного номера телефона', () => {
		expect(checkPhone('+123456789')).toEqual(successResult);
		expect(checkPhone('123456789012345')).toEqual(successResult);
	});

	test('Проверка неправильного номера телефона', () => {
		expect(checkPhone('+12345678')).toEqual(errorAnswer);
		expect(checkPhone('1234567890123456')).toEqual(errorAnswer);
		expect(checkPhone('1234567890123456')).toEqual(errorAnswer);
		expect(checkPhone('123456789A')).toEqual(errorAnswer);
	});
});

describe('Проверка пароля', () => {
	let successResult = {
		result: true,
	};

	let errorAnswer = {
		result: false,
		error:
			'От 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
	};

	test('Проверка правильного пароля', () => {
		expect(checkPassword('P@ssw0rd')).toEqual(successResult);
		expect(checkPassword('Password01Password02P2ssword03Password04')).toEqual(
			successResult
		);
	});

	test('Проверка неправильного пароля', () => {
		expect(checkPassword('P@ssw0r')).toEqual(errorAnswer);
		expect(checkPassword('Password01Password02P2ssword03Password045')).toEqual(
			errorAnswer
		);
		expect(checkPassword('passw0rd')).toEqual(errorAnswer);
		expect(checkPassword('Password')).toEqual(errorAnswer);
	});
});
