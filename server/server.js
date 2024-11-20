const { Server } = require('socket.io');
const { createServer } = require('http');

// Configuração Serverless
let io;
let server;

module.exports = (req, res) => {
  if (!io) {
    server = createServer((req, res) => {
      res.writeHead(404);
      res.end();
    });

    io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    // Configuração do Socket.IO
    io.on('connection', (socket) => {
      console.log('Usuário conectado:', socket.id);

      socket.on('join channel', ({ group, channel }) => {
        const room = `${group}-${channel}`;
        socket.join(room);
        console.log(`${socket.id} entrou em ${room}`);
        socket.to(room).emit('system message', `Novo usuário entrou no canal: ${channel}`);
      });

      socket.on('chat message', ({ group, channel, message }) => {
        const room = `${group}-${channel}`;
        io.to(room).emit('chat message', message);
      });

      socket.on('disconnect', () => {
        console.log('Usuário desconectado:', socket.id);
      });
    });
  }

  // Configurações para o serverless
  server.once('request', req);
  server.listen(0, () => {
    const { port } = server.address();
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ port }));
  });
};
