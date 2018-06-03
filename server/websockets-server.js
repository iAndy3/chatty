const WebSocket = require('ws').Server;
const wss = new WebSocket({ port: 8088 });
const {people} = require('./mock-data');

const noticeAllClients = message => wss.clients.forEach(client => client.send(JSON.stringify(message)));



wss.on('connection', ws => {
	//ws.send(JSON.stringify({type: 'GET_ME', payload: newPlayer}));

	ws.on('close', () => {

	});

	ws.on('message', message => {
		const {type, payload} = JSON.parse(message);

		switch(type) {
			case 'CONNECTED':
				noticeAllClients({type: 'GET_PEOPLE', payload: [...people, {username: payload, uid: 352}]});

				break;
			case 'RESET_PLAYERS':

				break;
			default:
		}
	});
});

module.exports = wss;