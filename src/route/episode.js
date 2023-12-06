import express from 'express';
import {
  getEpisodes, getEpisodesByMonth, postEpisode, putEpisode, deleteEpisode, getEpisodesBySubject
} from '../controller/episodeController.js';

const router = express.Router();

router.route('/')
  .get(getEpisodes)
  .post(postEpisode);

// router.route('/:id')
//   // .get(getEpisode)
//   .put(putEpisode)
//   .delete(deleteEpisode);

router.route('/:date')
  .get(getEpisodesByMonth);

router.route('/:subject')
  .get(getEpisodesBySubject);

export default router;
