import log from '../util/logger.js';
import Response from '../../domain/response.js';
import db from '../../db/model/db.js';
import {Op} from 'sequelize';

const HttpStatus = {
  OK: { code: 200, status: 'OK' },
  CREATED: { code: 201, status: 'CREATED' },
  NO_CONTENT: { code: 204, status: 'NO_CONTENT' },
  BAD_REQUEST: { code: 400, status: 'BAD_REQUEST' },
  NOT_FOUND: { code: 404, status: 'NOT_FOUND' },
  INTERNAL_SERVER_ERROR: { code: 500, status: 'INTERNAL_SERVER_ERROR' },
};

const Episodes = db.episodes;
const Colors = db.colors;
const Subjects = db.subjects;

export const getEpisodes = async (req, res) => {
  log.info(`${req.method} ${req.originalUrl}, fetching episodes`);
  let results = await Episodes.findAll({})
  if (!results) {
    log.info(results)
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code, HttpStatus.OK.status, 'No episodes found'));
  } else {
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code,
        HttpStatus.OK.status, 'Episodes retrieved', { episodes: results }));
  }
};

export async function getEpisodesSearch(req, res) {
  log.info(`${req.method} ${req.originalUrl}, fetching episodes`);
  let request = [];
  if (Object.entries(req.query).length > 0) {
    request = req.query;
  } else if (Object.entries(req.body).length > 0) {
    request = req.body;
  } else if (Object.entries(req.params).length > 0) {
    request = req.params;
  }
  else {
    res.status(HttpStatus.BAD_REQUEST.code)
      .send(new Response(HttpStatus.BAD_REQUEST.code,
        HttpStatus.BAD_REQUEST.status, 'No query found'));
    return;
  }
  let episodes = [];
  let dates = [];
  let colors = [];
  let subjects = [];
  let colors_andor_subjects = request.colors_andor_subjects;
  // log.info(`query contains: ${Object.entries(req.query)}`)
  // log.info(`body contains: ${Object.entries(req.body)}`)
  // log.info(`params contians: ${Object.entries(req.params)}`)

  // filtering by dates

  if (request.date) {
    const query = request.date.split(' ');
    const data = await Episodes.findAll({
      attributes: ['episode'],
      where: {
        [Op.and]: [
          {date: { [Op.like]: `${query[0]}%` }},
          {date: { [Op.like]: `%${query[1]}` }}
      ]}
    });
    dates = data.map((episode) => episode.dataValues);
  }

  // filtering by colors

  if (request.colors) {
    const colorsArray = request.colors.split(',');
    let andor = request.colors_andor;
    if (colorsArray.length > 1) {
      if(!andor || andor !== 'and' && andor !== 'or') {
        res.status(HttpStatus.BAD_REQUEST.code)
          .send(new Response(HttpStatus.BAD_REQUEST.code,
            HttpStatus.BAD_REQUEST.status, 'Please specify whether you would like episodes with all or any of the colors specified, by setting the andor query parameter to "and" or "or"'));
        return;
      }};
    const query = colorsArray.map(key => ({ [key]: 1 }));
    let data ={}
    if (andor === 'or') {
      data = await Colors.findAll({
        attributes: ['episode'],
        where: {
          [Op.or]: query
        }
      });
    } else {
      data = await Colors.findAll({
        attributes: ['episode'],
        where: {
          [Op.and]: query
        }
      });
    }
    colors = data.map((episode) => episode.dataValues);
  }

  // filtering by subjects

  if (request.subjects) {
    const subjectsArray = request.subjects.split(',');
    let andor = request.subjects_andor;
    if (subjectsArray.length > 1) {
      if(!andor || andor !== 'and' && andor !== 'or') {
        res.status(HttpStatus.BAD_REQUEST.code)
          .send(new Response(HttpStatus.BAD_REQUEST.code,
            HttpStatus.BAD_REQUEST.status, "Please specify whether you would like episodes with all or any of the subjects specified, by setting the andor query parameter to 'and' or 'or'"));
        return;
      }};
    const query = subjectsArray.map(key => ({ [key]: 1 }));
    let data ={}
    if (andor === 'or') {
      data = await Subjects.findAll({
        attributes: ['episode'],
        where: {
          [Op.or]: query
        }
      });
    } else {
      data = await Subjects.findAll({
        attributes: ['episode'],
        where: {
          [Op.and]: query
        }
      });
    }
    subjects = data.map((episode) => episode.dataValues);
  }

  // finally get all episodes that match the query(s)

  if (dates.length === 0 && colors.length === 0 && subjects.length === 0) {
    res.status(HttpStatus.BAD_REQUEST.code)
      .send(new Response(HttpStatus.BAD_REQUEST.code,
        HttpStatus.BAD_REQUEST.status, 'No query found'));
    return;
  }
  let mergedQueryList = [];
  if (dates.length > 0 && colors.length > 0 && subjects.length > 0) {
    if (colors_andor_subjects === 'and') {
      const mergedArray = colors.filter(a => subjects.some(b => a.episode === b.episode));
      mergedQueryList = dates.filter(a => mergedArray.some(b => a.episode === b.episode));
    } else {
      const mergedArray = [...colors, ...subjects];
      mergedQueryList = dates.filter(a => mergedArray.some(b => a.episode === b.episode));
    }
  }
  if (dates.length > 0 && colors.length > 0 && subjects.length === 0) {
    mergedQueryList = dates.filter(a => colors.some(b => a.episode === b.episode));
  }
  if (dates.length > 0 && colors.length === 0 && subjects.length > 0) {
    mergedQueryList = dates.filter(a => subjects.some(b => a.episode === b.episode));
  }
  if (dates.length === 0 && colors.length > 0 && subjects.length > 0) {
    if (colors_andor_subjects === 'and') {
      mergedQueryList = colors.filter(a => subjects.some(b => a.episode === b.episode));
    } else {
      mergedQueryList = [...colors, ...subjects];
    }
  }
  if (dates.length > 0 && colors.length === 0 && subjects.length === 0) {
    mergedQueryList = dates;
  }
  if (dates.length === 0 && colors.length > 0 && subjects.length === 0) {
    mergedQueryList = colors;
  }
  if (dates.length === 0 && colors.length === 0 && subjects.length > 0) {
    mergedQueryList = subjects;
  }
  log.info(mergedQueryList)
  const data = await Episodes.findAll({
    where: {
      [Op.or]: mergedQueryList
    }
  });
  episodes = data.map((episode) => episode.dataValues);
  if (episodes.length === 0) {
    res.status(HttpStatus.NOT_FOUND.code)
      .send(new Response(HttpStatus.NOT_FOUND.code,
        HttpStatus.NOT_FOUND.status, `No episodes with those selections found`));
  } else {
    res.status(HttpStatus.OK.code)
      .send(new Response(HttpStatus.OK.code,
        HttpStatus.OK.status, 'Episodes retrieved', { episodes: episodes }));
  }
};

export default HttpStatus;
