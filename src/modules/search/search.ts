import tpl from './search.hbs';
import './search.css';
import Component from '../../utils/component';
class Search extends Component {
	constructor(props: Props) {
		super('form', { ...props, attrs: { class: 'search', ...props.attrs } });
	}

	render() {
		return this.compile(tpl);
	}
}

export default Search;
