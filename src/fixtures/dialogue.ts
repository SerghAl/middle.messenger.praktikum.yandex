import { Message } from '../modules/chats';
import msgImg from '../../static/images/msg-img.jpg';
import m1 from 'bundle-text:./text_messages/m1.txt';
import m2 from 'bundle-text:./text_messages/m2.txt';
import m3 from 'bundle-text:./text_messages/m3.txt';

const dialogueData = [
	new Message({
		msg: [m1, m2],
		time: '11:56',
	}),
	new Message({
		msg: [],
		images: [
			{
				img: msgImg,
				title: 'Фотоаппарат Хассельблад',
			},
		],
		time: '11:56',
	}),
	new Message({
		msg: [m3],
		time: '12:00',
		isOwn: true,
		isViewed: true,
	}),
];

export default dialogueData;
