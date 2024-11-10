const WebSocket = require('ws');
const wss = new WebSocket.Server({port:8080});

wss.on('connection', (client) => {
  console.log('WebSocket client connected');
  client.on('message', (message) => {
    console.log(`${message}`);
  });
  // ask for counter value once a second
  setInterval(() => {
    client.send('counter')
  }, 1000)
})

wss.on('listening', () => {
  console.log('listening on port 8080');
})