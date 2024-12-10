import express from 'express';
import { WebSocketServer } from 'ws';
import { createServer } from 'http';
import cors from 'cors';
import { nanoid } from 'nanoid';


const app = express();
app.use(cors());
app.use(express.json());

const server = createServer(app);
const wss = new WebSocketServer({ server });


const rooms = new Map();
const connections = new Map();

const broadcastToRoom = (roomId, message) => {
  const room = rooms.get(roomId);
  if (!room) return;

  room.clients.forEach(client => {
    if (client.ws.readyState === 1) { 
      client.ws.send(JSON.stringify(message));
    }
  });
};

const removeClientFromRoom = (roomId, clientId) => {
  const room = rooms.get(roomId);
  if (!room) return;

  room.clients = room.clients.filter(client => client.id !== clientId);
  
  if (room.clients.length === 0) {
    rooms.delete(roomId);
    console.log(`Room ${roomId} deleted - no more clients`);
  } else {
    broadcastToRoom(roomId, {
      type: 'system',
      content: `User left the room`,
      timestamp: Date.now(),
      id: nanoid()
    });
  }
};


app.post('/api/rooms', (req, res) => {
  const { username } = req.body;
  const roomId = nanoid();
  
  rooms.set(roomId, {
    id: roomId,
    clients: [],
    messages: [],
    created: Date.now()
  });

  console.log(`Room ${roomId} created by ${username}`);
  res.json({ roomId });
});

app.get('/api/rooms/:roomId', (req, res) => {
  const { roomId } = req.params;
  const room = rooms.get(roomId);
  
  if (!room) {
    return res.status(404).json({ error: 'Room not found' });
  }
  
  res.json({
    id: room.id,
    clientCount: room.clients.length,
    created: room.created
  });
});


wss.on('connection', (ws, req) => {
  const clientId = nanoid();
  const urlParams = new URL(req.url, `http://${req.headers.host}`).searchParams;
  const roomId = urlParams.get('roomId');
  const username = urlParams.get('username');

  if (!roomId || !username || !rooms.has(roomId)) {
    ws.close();
    return;
  }

 
  connections.set(ws, { clientId, roomId, username });

 
  const room = rooms.get(roomId);
  room.clients.push({ id: clientId, username, ws });


  ws.send(JSON.stringify({
    type: 'system',
    content: 'Connected to chat room',
    timestamp: Date.now(),
    id: nanoid()
  }));


  broadcastToRoom(roomId, {
    type: 'system',
    content: `${username} joined the room`,
    timestamp: Date.now(),
    id: nanoid()
  });


  ws.on('message', (data) => {
    try {
      const message = JSON.parse(data.toString());
      const enrichedMessage = {
        ...message,
        id: nanoid(),
        sender: username,
        timestamp: Date.now()
      };

      room.messages.push(enrichedMessage);
      broadcastToRoom(roomId, enrichedMessage);

      console.log(`Message in room ${roomId} from ${username}: ${message.content}`);
    } catch (error) {
      console.error('Error processing message:', error);
    }
  });

 
  ws.on('close', () => {
    const connection = connections.get(ws);
    if (connection) {
      removeClientFromRoom(connection.roomId, connection.clientId);
      connections.delete(ws);
      console.log(`Client ${connection.username} disconnected from room ${connection.roomId}`);
    }
  });

  console.log(`Client ${username} connected to room ${roomId}`);
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});