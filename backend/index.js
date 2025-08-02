import express from 'express';
import http from 'http';
import io from './socket.js';

const app = express();
const server = http.createServer(app);

const PORT = 4000;

// Attach socket.io to the HTTP server
io.attach(server);

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



