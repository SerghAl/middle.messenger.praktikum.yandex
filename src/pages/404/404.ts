import tpl from './404.hbs';
import './404.css';
import Component from '../../utils/component';

class UnfoundView extends Component {
	constructor(props: Props) {
		let styles = 'unfound_page';

		if (props.attrs && props.attrs.class) {
			styles += ` ${props.attrs.class}`;
		}

		super({ ...props, attrs: { ...props.attrs, class: styles } }, 'main');
	}

	render() {
		return this.compile(tpl);
	}

	hide() {
		this.getContent().outerHTML = '';
	}
}

export default UnfoundView;
