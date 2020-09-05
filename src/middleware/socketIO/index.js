const { createMessage } = require('./utils');

const setupSocketIO = io => {
  io.on('connection', socket => {
    console.log('New client connected');
    // Send welcome message only to new client
    socket.emit('receiveMessage', createMessage('Server', 'Welcome!'));
  
    // Send message to all clients except sender (connected socket)
    socket.broadcast.emit('receiveMessage', createMessage('Server', 'New user has joined'));
  
    // Listen to 'sendMessage' for messages from client
    socket.on('sendMessage', message => {
      console.log('Message received:', message);
      // Send the message to all clients including the sender (connected socket)
      io.emit('receiveMessage', createMessage(message.from, message.text));
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
      // Send message to all clients except sender (connected socket)
      socket.broadcast.emit('receiveMessage', createMessage('Server', 'User has disconnected'));
    });
  });
}

module.exports = {
  setupSocketIO,
};
