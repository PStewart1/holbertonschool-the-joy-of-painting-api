import express from 'express';
import ip from 'ip';
import dotenv from 'dotenv';
import cors from 'cors';
import Response from '../domain/response.js';
import log from './util/logger.js';
import HttpStatus from './controller/episodeController.js';
import router from './route/episode.js';
import initializeDb from './controller/filesController.js';

initializeDb()
// start server
dotenv.config();
const PORT = process.env.SERVER_PORT || 3000;
const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

app.use('/episodes', router);
app.get('/', (req, res) => {
  res.send(new Response(HttpStatus.OK.code,
    HttpStatus.OK.status, 'Welcome to the Joy of Painting API',));
});
app.all('*', (req, res) => {
  res.status(HttpStatus.NOT_FOUND.code)
    .send(new Response(HttpStatus.NOT_FOUND.code,
      HttpStatus.NOT_FOUND.status, 'Route does not exist'));
});

app.listen(PORT, () => {
  log.info(`Server running on ${ip.address()}:${PORT}`);
});

