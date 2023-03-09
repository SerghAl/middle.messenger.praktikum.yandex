import Component from '../component';
import Store from './Store';

export default function connect(
	component: typeof Component,
	mapStateToProps: Function
) {
	return class extends component {
		constructor(props: Props) {
			const store = new Store();
			super({ ...props, ...mapStateToProps(store.getState()) });
			store.on(Store.EVENTS.UPDATE, () => {
				this.setProps({ ...mapStateToProps(store.getState()) });
			});
		}
	};
}
