import tpl from './add_bar.hbs';
import './add_bar.css';
import Component from '../../../../utils/component';
class AddBar extends Component {
	constructor(props: Props) {
		let styles = 'addbar';

		if (props.attrs && props.attrs.class) {
			styles += ` ${props.attrs.class}`;
		}

		super({ ...props, attrs: { ...props.attrs, class: styles } }, 'form');
	}

	addEvents(): void {
		let input = this.getContent().querySelector('input');

		const { events = {} } = this.props;
		Object.keys(events).forEach((event: string): void => {
			if (event !== 'submit') {
				input?.addEventListener(event, events[event]);
			} else {
				this.getContent().addEventListener(event, events[event]);
			}
		});
	}

	render() {
		return this.compile(tpl);
	}
}

export default AddBar;
