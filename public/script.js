const socket = io();

// Elementos da página
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

// Enviar mensagem
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const message = input.value.trim();
  if (message) {
    socket.emit('chat message', message); // Enviar mensagem ao servidor
    input.value = '';
  }
});

// Receber mensagens do servidor
socket.on('chat message', (msg) => {
  const li = document.createElement('li');
  li.textContent = msg;
  messages.appendChild(li);
  messages.scrollTop = messages.scrollHeight; // Rolar para a última mensagem
});
