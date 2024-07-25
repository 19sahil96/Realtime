// // content of custom_node.js
// const http = require('http')  
// const port = 4200

// const requestHandler = (request, response) => {  
//   console.log(request.url)
//   response.end('Hello Node.js Server!')
// }

// const server = http.createServer(requestHandler)

// server.listen(port, (err) => {  
//   if (err) {
//     return console.log('something bad happened', err)
//   }

//   console.log(`server is listening on ${port}`)
// })



const express = require('express');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const port = 4200;
let receivedData = [];

// Use the cors middleware to allow requests from http://localhost:3000
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.post('/', (req, res) => {
    console.log('Received JSON:', req.body);
    receivedData.push(req.body);
    res.send('Hello Node.js Server!');
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(receivedData));
        }
    });
});

app.get('/data', (req, res) => {
    res.json(receivedData);
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    console.log('New WebSocket connection');
});

server.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }

    console.log(`server is listening on ${port}`);
});
