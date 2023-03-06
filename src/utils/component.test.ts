import Component from './component';
import { compile } from 'handlebars';

class TemplateComponent extends Component {
	constructor(props: Props) {
		super({ ...props }, 'div');
	}
	render() {
		return this.compile(compile('{{content}}'));
	}
}

describe('Тестирование жизненного цикла компонента', () => {
	test('Создание компонента', function () {
		let div = new Component({}, 'div');
		expect(div.getContent().outerHTML).toBe('<div></div>');
	});

	test('Добавление атрибутов к компоненту', function () {
		let div = new Component(
			{
				attrs: {
					id: 'divId',
				},
			},
			'div'
		);
		expect(div.getContent().outerHTML).toBe('<div id="divId"></div>');
	});

	test('Рендеринг шаблона', function () {
		let div = new TemplateComponent({ content: 'Привет' });

		expect(div.getContent().outerHTML).toBe('<div>Привет</div>');
	});

	test('Изменение свойств компонента', function () {
		let div = new TemplateComponent({ content: 'Привет' });
		div.setProps({ content: 'Пока' });
		expect(div.getContent().outerHTML).toBe('<div>Пока</div>');
	});

	test('Проверка установки событий на компонент', function () {
		let div = new TemplateComponent({
			content: 'Нажми на меня',
			events: {
				click: (e: Event) => {
					e.preventDefault();
					div.setProps({ content: 'Событие' });
				},
			},
		});

		div.getContent().click();

		expect(div.getContent().outerHTML).toBe('<div>Событие</div>');
	});
});
