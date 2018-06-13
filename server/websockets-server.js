const WebSocket = require('ws').Server,
	_ = require('lodash');

const wss = new WebSocket({ port: 8088 });
const {sendPrivateMessage, noticeAllClients} = require('./utils/tools');

let allPeople = [],
	clients = {},
	currentPlayer = {};

wss.on('connection', ws => {
	ws.on('message', message => {
		const {type, payload} = JSON.parse(message);

		switch(type) {
			case 'CONNECTED':
				currentPlayer = {
					uid: _.uniqueId('player_'),
					username: payload
				}
				clients[currentPlayer.uid] = ws;
				allPeople.push(currentPlayer);

				sendPrivateMessage(ws, {type: 'GET_ME', payload: currentPlayer});
				noticeAllClients(wss, {type: 'GET_PEOPLE', payload: allPeople});
				break;
			case 'PRIVATE_MESSAGE':
				clients.hasOwnProperty(payload.to) && sendPrivateMessage(clients[payload.to], {type: 'NEW_MESSAGE', payload});
				break;
			default:
		}
	});
	
	ws.on('close', () => {
		allPeople = allPeople.filter(person => person.uid !== currentPlayer.uid);
		noticeAllClients(wss, {type: 'GET_PEOPLE', payload: allPeople});
	});
});

module.exports = wss;