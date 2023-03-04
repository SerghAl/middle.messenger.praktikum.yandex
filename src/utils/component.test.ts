import Component from './component';

test('Создание компонента', function () {
	let div = new Component('div', {});
	expect(div.getContent().outerHTML).toBe('<div></div>');
});
