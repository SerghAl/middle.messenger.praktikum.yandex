import Store from './Store';

const store = new Store();

export const setUserInfo = (data: Props) => {
	store.set('userInfo', data);
};

export const getUserInfo = () => {
	let state = store.getState();
	let userInfo = state.userInfo;

	return Object.assign({}, userInfo);
};
