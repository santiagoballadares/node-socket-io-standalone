const express = require('express');
const app = express();

const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);
const { setupSocketIO } = require('./middleware/socketIO');
setupSocketIO(io);

const path = require('path');
app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});
