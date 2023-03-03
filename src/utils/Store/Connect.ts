import Component from '../component';
import Store from './Store';

export default function connect(
	Component: Component,
	mapStateToProps: Function
) {
	return class extends Component {
		constructor(props: Props) {
			const store = new Store();
			super({ ...props, ...mapStateToProps(store.getState()) });
			store.on(Store.EVENTS.UPDATE, () => {
				this.setProps({ ...mapStateToProps(store.getState()) });
			});
		}
	};
}
