import express from 'express';
import { getEpisodes, getEpisodesSearch } from '../controller/episodeController.js';

const router = express.Router();

router.route('/')
  .get(getEpisodes)

router.route('/search/')
  .get(getEpisodesSearch);

router.route('/search/:date?/:colors?/:colors_andor?/:subjects?/:subjects_andor?/:colors_andor_subjects?')
  .get(getEpisodesSearch);

export default router;
