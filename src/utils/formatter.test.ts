import { formatDate } from './formatter';

test('Переводит полную дату в "чч:мм"', () => {
	expect(formatDate('2023-02-27T20:17:37+00:00')).toMatch(
		/^[0-9]{1,2}:[0-9]{1,2}$/
	);
});
