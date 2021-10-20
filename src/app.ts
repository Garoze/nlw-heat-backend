import 'dotenv/config';

import cors from 'cors';
import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

import { router } from './routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);

export const serverHttp = http.createServer(app);

export const io = new Server(serverHttp, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`User connected ${socket.id}`);
});

app.get('/github', (_request, response) => {
  response.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});

app.get('/sigin/callback', (request, response) => {
  const { code } = request.query;

  return response.json(code);
});
