import database from '../../db/mysql.config.js';
import log from '../util/logger.js';
import Response from '../../domain/response.js';
import QUERY from '../query/query.js';

const HttpStatus = {
  OK: { code: 200, status: 'OK' },
  CREATED: { code: 201, status: 'CREATED' },
  NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
  BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
  NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
  INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' },
};

export const getEpisodes = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, fetching episodes`);
  database.query(QUERY.SELECT_EPISODES, (error, results) => {
    if (error) {
      log.error(error.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code,
          HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error'));
    } else if (!results) {
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No episodes found'));
    } else {
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code,
          HttpStatus.OK.status, 'Episodes retrieved', { episodes: results }));
    }
  });
};

export const getEpisodesByMonth = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, fetching episodes`);
  const listOfDates = req.params.date.split(',');
  let episodes = [];
  listOfDates.forEach((date) => {
    const dateArray = date.split('-');
    // log.info(dateArray[0])
    database.query(QUERY.SELECT_EPISODESBYMONTH, [`${dateArray[0]}%`], (error, results) => {
      if (error) {
        log.error(error.message);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
          .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code,
            HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error'));
      }
      else if (!results) {
        res.status(HttpStatus.NOT_FOUND.code)
          .send(new Response(HttpStatus.NOT_FOUND.code,
            HttpStatus.NOT_FOUND.status, `No episodes in ${req.params.date} found. Did you enter the full month and year? (eg: 'January-1983')`));
      } else {
        // log.info(results)
        results.forEach((episode) => {
          if (episode.date.includes(dateArray[1]))
          episodes.push(episode);
        });
        log.info(episodes)
      }
    });
  });
  log.info('episodes after query statemnet: ',episodes)
  res.status(HttpStatus.OK.code)
    .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Episodes retrieved', episodes));
};

export const getEpisodesBySubject = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, fetching episode`);
  const dateArray = req.params.subject.split(',');
  database.query(QUERY.SELECT_EPISODESBYMONTH, [`${dateArray[0]}%`], (error, results) => {
    if (error) {
      log.error(error.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code,
          HttpStatus.INTERNAL_SERVER_ERROR.status, 'Internal Server Error'));
    }
    else if (!results) {
      res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code,
          HttpStatus.NOT_FOUND.status, `No episodes in ${req.params.subject} found. Did you enter the full month and year? (eg: 'January-1983')`));
    } else {
      let episodes = [];
      results.forEach((episode) => {
        if (episode.date.includes(dateArray[1]))
        episodes.push(episode);
      });
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Episodes retrieved', episodes));
    }
  });
};

export const postEpisode = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, creating episode`);
  database.query(QUERY.CREATE_EPISODE_PROCEDURE, Object.values(req.body), (error, results) => {
    if (error || !results) {
      log.error(error.message);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
        .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code,
          HttpStatus.INTERNAL_SERVER_ERROR.status, 'Error creating episode'));
    } else {
      // const episode = { id: results.insertId, ...req.body };
      const episode = results[0][0];
      res.status(HttpStatus.CREATED.code)
        .send(new Response(HttpStatus.CREATED.code,
          HttpStatus.CREATED.status, 'Episode created', { episode }));
    }
  });
};

export const putEpisode = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, fetching episode`);
  database.query(QUERY.SELECT_EPISODE, [req.params.id], (err, result) => {
    if (err || !result) {
      log.error(err.message);
      res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code,
          HttpStatus.NOT_FOUND.status,
          `Episode with id ${req.params.id} not found`));
    } else {
      log.info(`${req.method} ${req.originalUrl}, updating episode`);
      database.query(QUERY.UPDATE_EPISODE,
        [...Object.values(req.body), req.params.id], (error, results) => {
          if (error || !results) {
            log.error(error.message);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR.code)
              .send(new Response(HttpStatus.INTERNAL_SERVER_ERROR.code,
                HttpStatus.INTERNAL_SERVER_ERROR.status,
                'Error updating episode'));
          } else {
            res.status(HttpStatus.OK.code)
              .send(new Response(HttpStatus.OK.code,
                HttpStatus.OK.status,
                'Episode updated', { id: req.params.id, ...req.body }));
          }
        });
    }
  });
};

export const deleteEpisode = (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, deleting episode`);
  database.query(QUERY.DELETE_EPISODE, [req.params.id], (error, results) => {
    if (results.affectedRows > 0) {
      res.status(HttpStatus.OK.code)
        .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'Episode deleted'));
    } else {
      // log.info(`${req.method} ${req.originalUrl}, deleting episode`);
      // database.query(QUERY.DELETE_EPISODE, [req.params.id], (error, results) => {
      //   if (error || !results) {
      //     log.error(error.message);
      res.status(HttpStatus.NOT_FOUND.code)
        .send(new Response(HttpStatus.NOT_FOUND.code,
          HttpStatus.NOT_FOUND.status,
          `Episode with id ${req.params.id} not found`));
      // } else {
      //   res.status(HttpStatus.NO_CONTENT.code)
      // .send(new Response(HttpStatus.NO_CONTENT.code,
      //   HttpStatus.NO_CONTENT.status,
      //   `Episode with id ${req.params.id} deleted`));
    }
  });
};

export default HttpStatus;
