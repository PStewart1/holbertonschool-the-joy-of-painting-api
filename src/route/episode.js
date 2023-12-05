import express from 'express';
import {
  getEpisodes, getEpisode, postEpisode, putEpisode, deleteEpisode
} from '../controller/episodeController.js';

const router = express.Router();

router.route('/')
  .get(getEpisodes)
  .post(postEpisode);

router.route('/:id')
  // .get(getEpisode)
  .put(putEpisode)
  .delete(deleteEpisode);

router.route('/:date')
  .get(getEpisode);

export default router;
