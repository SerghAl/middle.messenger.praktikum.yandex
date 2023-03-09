import ChatView from './chat';
import { connect } from '../../utils/Store';

export default connect(ChatView, (state: Props) => {
	return {
		dialogue: state.dialogue,
	};
});
