import personImg from '../../static/images/person1.png';
import attachIcon from '../../static/images/clip.svg';

import Chat from '../modules/chats';
import Search from '../modules/search';
import TextButton from '../modules/chats/components/button';
import ProfileBar from '../modules/chats/components/profile_bar';
import MessageBar from '../modules/chats/components/message_bar';

export default {
	messageBar: MessageBar({ attachIcon }),
	profileBar: ProfileBar({ img: personImg, title: 'Андрей' }),
	controls: TextButton,
	search: Search,
	chatList: [
		Chat({
			img: personImg,
			chatTitle: 'Андрей',
			chatMsg: 'Изображение',
			chatTime: '10:49',
			chatNewMsgs: 2,
		}),
		Chat({
			chatTitle: 'Киноклуб',
			ownMsg: true,
			chatMsg: 'стикер',
			chatTime: '12:00',
		}),
		Chat({
			chatTitle: 'Илья',
			chatMsg: 'Друзья, у меня для вас особенный выпуск новостей!...',
			chatTime: '15:12',
			chatNewMsgs: 2,
		}),
		Chat({
			chatTitle: 'Вадим',
			chatMsg: 'Круто!',
			chatTime: 'Пт',
			ownMsg: true,
		}),
		Chat({
			chatTitle: 'тет-а-теты',
			chatMsg: 'И Human Interface Guidelines и Material Design рекомендуют...',
			chatTime: 'Ср',
		}),
		Chat({
			chatTitle: '1, 2, 3',
			chatMsg: 'Миллионы россиян ежедневно проводят десятки часов свое...',
			chatTime: 'Пн',
		}),
		Chat({
			chatTitle: 'Design Destroyer',
			chatMsg: 'В 2008 году художник Jon Rafman  начал собирать...',
			chatTime: 'Пн',
		}),
		Chat({
			chatTitle: 'Day.',
			chatMsg: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
			chatTime: '1 Мая 2020',
		}),
		Chat({
			chatTitle: 'Стас Рогозин',
			chatMsg: 'Можно или сегодня или завтра вечером.',
			chatTime: '12 Апр 2020',
		}),
	],
};
