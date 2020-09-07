const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const { setupSocketIO } = require('./middleware/socketIO');

const app = express();

const server = http.Server(app);

const io = socketIO(server);
setupSocketIO(io);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
