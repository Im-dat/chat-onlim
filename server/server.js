const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve arquivos estáticos
app.use(express.static('public'));

// Conexão de usuários via WebSocket
io.on('connection', (socket) => {
  console.log('Novo usuário conectado:', socket.id);

  // Escutar mensagens do cliente
  socket.on('chat message', (msg) => {
    console.log(`Mensagem recebida: ${msg}`);
    io.emit('chat message', msg); // Enviar mensagem a todos os usuários
  });

  // Usuário desconectado
  socket.on('disconnect', () => {
    console.log('Usuário desconectado:', socket.id);
  });
});

// Iniciar servidor
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
