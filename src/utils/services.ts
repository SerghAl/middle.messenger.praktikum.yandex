import { getChatUsers, setDialogueMessages } from './Store/Actions';
import { formatDate } from './formatter';

export default function connectToChat(
	userId: string,
	chatId: string,
	token: string
) {
	const socket: TExtendedSocket = new WebSocket(
		`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
	);

	let connection: ReturnType<typeof setInterval>;

	socket.afterMessage = () => {};

	socket.addEventListener('open', () => {
		console.log('Соединение установлено');

		connection = setInterval(() => {
			socket.send(
				JSON.stringify({
					type: 'ping',
				})
			);
		}, 5000);

		socket.send(
			JSON.stringify({
				content: '0',
				type: 'get old',
			})
		);
	});

	socket.addEventListener('close', (event) => {
		if (event.wasClean) {
			console.log('Соединение закрыто чисто');
		} else {
			console.log('Обрыв соединения');
		}

		clearInterval(connection);

		console.log(`Код: ${event.code} | Причина: ${event.reason}`);
	});

	socket.addEventListener('message', (event) => {
		let dialogueData = JSON.parse(event.data);

		if (dialogueData.type === 'pong') return;

		if (Array.isArray(dialogueData)) {
			dialogueData = dialogueData.map((msg) => {
				return {
					...msg,
					formatTime: formatDate(msg.time),
					user: getChatUsers(msg.user_id).display_name,
				};
			});
		} else {
			dialogueData = [
				{
					...dialogueData,
					formatTime: formatDate(dialogueData.time),
					user: getChatUsers(dialogueData.user_id).display_name,
				},
			];
		}

		setDialogueMessages(dialogueData);
		if (socket.afterMessage) {
			socket.afterMessage();
		}
	});

	socket.addEventListener('error', (event) => {
		console.log('Ошибка', event);
	});

	return socket;
}
