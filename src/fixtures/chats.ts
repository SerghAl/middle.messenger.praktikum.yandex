import personImg from '../../static/images/person1.png';
import attachIcon from '../../static/images/clip.svg';

import Chat from '../modules/chats';
import Search from '../modules/search';
import TextArrowButton from '../modules/chats/components/button';
import ProfileBar from '../modules/chats/components/profile_bar';
import MessageBar from '../modules/chats/components/message_bar';

export default {
	messageBar: new MessageBar({ attachIcon }),
	profileBar: new ProfileBar({ img: personImg, title: 'Андрей' }),
	profileBtn: new TextArrowButton({
		title: 'Профиль',
		attrs: {
			href: '/profile',
			'data-href': 'profile',
			class: 'btn_textarrow',
		},
	}),
	search: new Search({ attrs: { action: '#' } }),
	chatList: [
		new Chat({
			img: personImg,
			chatTitle: 'Андрей',
			chatMsg: 'Изображение',
			chatTime: '10:49',
			chatNewMsgs: 2,
		}),
		new Chat({
			chatTitle: 'Киноклуб',
			ownMsg: true,
			chatMsg: 'стикер',
			chatTime: '12:00',
		}),
		new Chat({
			chatTitle: 'Илья',
			chatMsg: 'Друзья, у меня для вас особенный выпуск новостей!...',
			chatTime: '15:12',
			chatNewMsgs: 2,
		}),
		new Chat({
			chatTitle: 'Вадим',
			chatMsg: 'Круто!',
			chatTime: 'Пт',
			ownMsg: true,
		}),
		new Chat({
			chatTitle: 'тет-а-теты',
			chatMsg: 'И Human Interface Guidelines и Material Design рекомендуют...',
			chatTime: 'Ср',
		}),
		new Chat({
			chatTitle: '1, 2, 3',
			chatMsg: 'Миллионы россиян ежедневно проводят десятки часов свое...',
			chatTime: 'Пн',
		}),
		new Chat({
			chatTitle: 'Design Destroyer',
			chatMsg: 'В 2008 году художник Jon Rafman  начал собирать...',
			chatTime: 'Пн',
		}),
		new Chat({
			chatTitle: 'Day.',
			chatMsg: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...',
			chatTime: '1 Мая 2020',
		}),
		new Chat({
			chatTitle: 'Стас Рогозин',
			chatMsg: 'Можно или сегодня или завтра вечером.',
			chatTime: '12 Апр 2020',
		}),
	],
};
