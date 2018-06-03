const noticeAllClients = (wss, message) => wss.clients.forEach(client => client.send(JSON.stringify(message)));
const sendPrivateMessage = (client, message) => client.send(JSON.stringify(message));

module.exports = {
	noticeAllClients,
	sendPrivateMessage
}