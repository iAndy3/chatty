const express = require('express'),
	path = require('path'),
	ws = require('./websockets-server');

const app = express(),
	port = 8080;

app.use(express.static(path.join(__dirname + '/../')));
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/../index.html')));

app.listen(port, () => console.log(`Listening on port ${port}`));