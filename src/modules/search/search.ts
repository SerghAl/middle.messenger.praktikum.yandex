import tpl from './search.hbs';
import './search.css';
import Component from '../../utils/component';
class Search extends Component {
	constructor(props: Props) {
		let styles = 'search';

		if (props.attrs && props.attrs.class) {
			styles += ` ${props.attrs.class}`;
		}

		super('form', { ...props, attrs: { ...props.attrs, class: styles } });
	}

	render() {
		return this.compile(tpl);
	}
}

export default Search;
