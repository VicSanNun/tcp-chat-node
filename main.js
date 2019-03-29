'use strict';

const net = require('net');

const chatServer = net.createServer();
const clientList = [];

let broadcast = (message, client)=>{
	for(let i = clientList.length - 1; i >= 0; i--){
		if(client !== clientList[i]){
			clientList[i].write(`${message}`);
		}
	}
};

chatServer.on('connection', (client)=>{
	client.write('Hello to TCPChat\n');
	clientList.push(client);
	client.on('data', (data)=>{
		broadcast(data, client);
	});
	client.on('end', ()=>{
		console.log(`client ${clientList.indexOf(client)}`);
		clientList.splice(clientList.indexOf(client), 1);
	});
	client.on('error', (e)=>{
		console.log(e);
	});
});
chatServer.listen(9000);

