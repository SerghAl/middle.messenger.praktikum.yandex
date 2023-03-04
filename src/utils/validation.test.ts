import { checkName } from './validation';

test('Валидация верного имени пользователя', () => {
	expect(checkName('HollyDolly')).toEqual({ result: true });
});

test('Валидация неправильного имени пользователя', () => {
	let wrongInputs = ['hollyDolly', 'Holly Dolly', 'Holly-Dolly'];

	wrongInputs.forEach((wrongInput) => {
		expect(checkName(wrongInput)).toEqual({
			result: false,
			error:
				'Латиница или кириллица, первая буква должна быть заглавной, без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
		});
	});
});
