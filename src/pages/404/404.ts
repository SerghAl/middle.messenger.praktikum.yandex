import tpl from './404.hbs';
import './404.css';
import Component from '../../utils/component';

class UnfoundView extends Component {
	constructor(props: { [key: PropertyKey]: string }) {
		super('main', { ...props, attrs: { class: 'unfound_page' } });
	}

	render() {
		return this.compile(tpl);
	}
}

export default UnfoundView;
