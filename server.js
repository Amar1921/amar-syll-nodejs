const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = process.env.PORT || 3080;

// Map username -> socket.id pour éviter les doublons et faciliter la gestion
const connectedUsers = new Map();

server.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`🔌 New connection: ${socket.id}`);

  // Enregistrement du pseudo
  socket.on('new user', (username, callback) => {
    const trimmed = (username || '').trim();

    if (!trimmed) {
      return callback({ success: false, error: 'Username cannot be empty.' });
    }

    if (connectedUsers.has(trimmed)) {
      return callback({ success: false, error: 'Username is already taken.' });
    }

    socket.username = trimmed;
    connectedUsers.set(trimmed, socket.id);

    broadcastUserList();

    io.emit('system message', `${trimmed} joined the chat.`);
    console.log(`👤 User joined: ${trimmed}`);

    callback({ success: true });
  });

  // Envoi d'un message
  socket.on('send message', (msg) => {
    if (!socket.username || !msg || !msg.trim()) return;

    io.emit('new message', {
      user: socket.username,
      msg: msg.trim(),
      timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
    });
  });

  // Indicateur de frappe (broadcast uniquement aux autres)
  socket.on('typing', () => {
    if (!socket.username) return;
    socket.broadcast.emit('typing', { username: socket.username });
  });

  // Déconnexion
  socket.on('disconnect', () => {
    if (!socket.username) return;

    connectedUsers.delete(socket.username);
    broadcastUserList();

    io.emit('system message', `${socket.username} left the chat.`);
    console.log(`❌ User left: ${socket.username}`);
  });

  function broadcastUserList() {
    io.emit('usernames', Array.from(connectedUsers.keys()));
  }
});
