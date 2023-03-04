import { formatDate } from './formatter';
import * as chai from 'chai';

describe('Форматирование даты', function () {
	it('Переводит полную дату в "чч:мм"', function () {
		chai.assert.equal(formatDate('2023-02-27T20:17:37+00:00'), '0:17');
	});
});
