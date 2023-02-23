import { getChatUsers, setDialogueMessages } from './Store/Actions';
import { formatDate } from './formatter';

export default function connectToChat(userId, chatId, token) {
	const socket = new WebSocket(
		`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`
	);

	socket.addEventListener('open', () => {
		console.log('Соединение установлено');

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

		console.log(`Код: ${event.code} | Причина: ${event.reason}`);
	});

	socket.addEventListener('message', (event) => {
		let dialogueData = JSON.parse(event.data);
		if (Array.isArray(dialogueData)) {
			dialogueData = dialogueData.map((msg) => {
				return {
					...msg,
					time: formatDate(msg.time),
					user: getChatUsers(msg.user_id).display_name,
				};
			});
		} else {
			dialogueData = [
				{
					...dialogueData,
					time: formatDate(dialogueData.time),
					user: getChatUsers(dialogueData.user_id).display_name,
				},
			];
		}

		setDialogueMessages(dialogueData);
		console.log('Получены данные', event.data);
	});

	socket.addEventListener('error', (event) => {
		console.log('Ошибка', event.message);
	});

	return socket;
}
