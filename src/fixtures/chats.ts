import personImg from '../../static/images/person1.png';
import attachIcon from '../../static/images/clip.svg';
import arrowIcon from '../../static/images/arrow.svg';

import Chat from '../modules/chats';
import Search from '../modules/search';
import TextArrowButton from '../modules/chats/components/button';
import ProfileBar from '../modules/chats/components/profile_bar';
import MessageBar from '../modules/chats/components/message_bar';

import BaseInput from '../modules/forms/components/base_input';
import IconButton from '../components/icon_button';
import { checkMessage } from '../utils/validation';
import { Router } from '../utils/Router/index';

const router = new Router('.app');

let messageInput = new BaseInput({
	events: {
		blur: () => {
			messageInput.checkValidation();
		},
	},
	validator: checkMessage,
	attrs: {
		name: 'message',
		type: 'text',
		class: 'message_bar--input',
	},
});

let messageBarSettings: Props = {
	method: 'POST',
	action: '/fakeapi/v1/chat',
	messageInput,
	attachBtn: new IconButton({
		src: attachIcon,
		attrs: {
			class: 'message_bar--attach_btn',
		},
		alt: 'Прикрепить файл',
	}),
	sendBtn: new IconButton({
		src: arrowIcon,
		attrs: {
			class: 'message_bar--submit',
		},
		alt: 'Отправить сообщение',
	}),
	events: {
		submit: (e: Event): void => {
			e.preventDefault();
			messageInput.checkValidation();

			let formData = new FormData(<HTMLFormElement>e.target);
			console.log('Message form: ', Object.fromEntries(formData.entries()));
		},
	},
};

export default {
	messageBar: new MessageBar(messageBarSettings),
	profileBar: new ProfileBar({ img: personImg, title: 'Андрей' }),
	profileBtn: new TextArrowButton({
		title: 'Профиль',
		attrs: {
			href: '/profile',
			'data-href': 'profile',
			class: 'btn_textarrow',
		},
		events: {
			click: (e: Event): void => {
				e.preventDefault();
				router.go(`/${e.target.dataset.href}`);
			},
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
