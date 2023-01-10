import personImg from '../../static/images/person1.png';
import msgImg from '../../static/images/msg-img.jpg';
import attachIcon from '../../static/images/clip.svg';

import Chat from '../modules/chats';
import Search from '../modules/search';
import TextButton from '../modules/chats/components/button';
import Message from '../modules/chats/components/message';
import ProfileBar from '../modules/chats/components/profile_bar';
import MessageBar from '../modules/chats/components/message_bar';

export default {
	messageBar: MessageBar({ attachIcon }),
	profileBar: ProfileBar({ img: personImg, title: 'Андрей' }),
	// dialogue: [
	// 	Message(
	// 		{
	// 			msg: [
	// 				'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой.',
	// 				'Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
	// 			],
	// 			time: '11:56',
	// 		},
	// 		{
	// 			msg: [],
	// 			images: [msgImg],
	// 			time: '11:56',
	// 		},
	// 		{
	// 			msg: 'Круто!',
	// 			time: '12:00',
	// 			isOwn: true,
	// 			isViewed: true,
	// 		}
	// 	),
	// 	Message({
	// 		msg: [],
	// 		images: [msgImg],
	// 		time: '11:56',
	// 	}),
	// 	Message({
	// 		msg: ['Круто!'],
	// 		time: '12:00',
	// 		isOwn: true,
	// 		isViewed: true,
	// 	}),
	// ],
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
