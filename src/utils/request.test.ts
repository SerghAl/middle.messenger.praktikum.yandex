import HTTPTransport from './request';

let testBaseUrl = 'https://jsonplaceholder.typicode.com';

// данные для тестирования взяты с https://jsonplaceholder.typicode.com/guide/

describe('Тест модуля отправки запросов', () => {
	test('Проверка GET запросов', () => {
		let request = new HTTPTransport('/todos', testBaseUrl);
		return request
			.get('/1')
			.then(({ response }) => JSON.parse(response))
			.then((data) => {
				expect(data.id).toBe(1);
			});
	});

	test('Проверка POST запросов', () => {
		let request = new HTTPTransport('/posts', testBaseUrl);
		return request
			.post('/', {
				data: JSON.stringify({
					userId: 100,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
			.then(({ response }) => JSON.parse(response))
			.then((data) => {
				expect(data.userId).toBe(100);
			});
	});

	test('Проверка PUT запросов', () => {
		let request = new HTTPTransport('/posts', testBaseUrl);
		return request
			.put('/1', {
				data: JSON.stringify({
					id: 1,
					userId: 200,
				}),
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
			})
			.then(({ response }) => JSON.parse(response))
			.then((data) => {
				expect(data.userId).toBe(200);
			});
	});

	test('Проверка DELETE запросов', () => {
		let request = new HTTPTransport('/posts', testBaseUrl);
		return request
			.delete('/1')
			.then(({ response }) => JSON.parse(response))
			.then((data) => {
				expect(data).toEqual({});
			});
	});
});
