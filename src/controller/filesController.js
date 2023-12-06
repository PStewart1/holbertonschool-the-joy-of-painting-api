import fs from 'fs';
import { parse } from 'csv-parse';
import path from 'path';
import { URL } from 'url';
import database from '../../db/mysql.config.js';
import QUERY from '../query/query.js';
import log from '../util/logger.js';

const dirName = new URL('.', import.meta.url).pathname;
const csvPath1 = path.join(dirName, 'TheJoyOfPainting-Colors_Used.csv');
const csvPath2 = path.join(dirName, 'TheJoyOfPainting-Episode_Dates.csv');
const csvPath3 = path.join(dirName, 'TheJoyOfPainting-Subject_Matter.csv');

const episodedata = [];
const arrayOfColors = [];
const dates = [];
const arrayOfSubjects = [];
const episodes = [];

async function getEpisodeData() { 
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath1)
      .pipe(parse({ delimiter: ',', from_line: 2 }))
      .on('data', (row) => {
        const painting_index = parseInt(row[1]);
        const num_colors = parseInt(row[6]);
        episodedata.push([
          row[3], // title
          row[7], // url
          row[2], // img_src
          painting_index,
          num_colors,
          row[9] // color_hexes
        ]);
        let colors = [];
        for (let i = 10; i < 28; i++) {
          colors[i - 10] = row[i];
        }
        arrayOfColors.push(colors);
      })
      .on('end', () => {
        log.info('CSV file "Colors_Used" processed');
        resolve(episodedata);
      })
      .on('error', (error) => {
        log.error(error);
        reject(error);
      });
  });
}

async function getDates() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath2)
      .pipe(parse({ delimiter: [' (', ')'], from_line: 1, relax_column_count: true }))
      .on('data', (row) => {
        dates.push([
          row[0], // title
          row[1], // date
          row[2] // notes
        ]);
      })
      .on('end', () => {
        log.info('CSV file "Episode_Dates" processed');
        resolve(dates);
      })
      .on('error', (error) => {
        log.error(error);
        reject(error);
      });
  });
}

async function getSubjects() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(csvPath3)
      .pipe(parse({ delimiter: [','], from_line: 2, relax_column_count: true }))
      .on('data', (row) => {
        let subjects = [];
        for (let i = 2; i < 69; i++) {
          subjects[i - 2] = row[i];
        }
        arrayOfSubjects.push(subjects);
        episodes.push(row[0]);
      })
      .on('end', () => {
        log.info('CSV file "Subject_Matter" processed');
        resolve(arrayOfSubjects);
      })
      .on('error', (error) => {
        log.error(error);
        reject(error);
      });
  });
}

async function mergeEpisodes(arr1, arr2, arr3) {
  let merged = [];
  let episode = [];
  for (let i = 0; i < arr1.length; i++) {
      episode = [
        arr3[i], // episode
        arr1[i][0], // title
        arr2[i][1], // date
        arr1[i][1], // url
        arr1[i][2], // img_src
        arr1[i][3], // painting_index
        arr1[i][4], // num_colors
        arr1[i][5], // color_hexes
        arr2[i][2], // notes
      ];
    merged.push(episode);
  }

  await database.query(QUERY.INSERT_EPISODES, [merged], (error, results) => {
    if (error || !results) {
      log.error(error.message);
      return;
    } else {
      log.info("Episodes inserted: " + results.affectedRows);
      return;
    }
  });
};

async function mergeColors(arr1, arr2) {
  let merged = [];
  let colors = [];
  for (let i = 0; i < arr1.length; i++) {
    colors = [arr2[i],arr1[i][17]]; // episode, Alizarin_Crimson
    for (let j = 0; j < 17; j++) {
      colors.push(arr1[i][j]);
    }
    merged.push(colors);
  }
  
  database.query(QUERY.INSERT_COLORS, [merged], (error, results) => {
    if (error || !results) {
      log.error(error.message);
      return;
    } else {
      log.info("Colors inserted: " + results.affectedRows);
      return;
    }
  });
};

async function mergeSubjects(arr1, arr2) {
  let merged = [];
  let subjects = [];
  for (let i = 0; i < arr1.length; i++) {
    subjects = [
      arr2[i] // episode
    ];
    for (let j = 0; j < arr1[0].length; j++) {
      subjects.push(arr1[i][j])
    }
    merged.push(subjects);
  }
  
  database.query(QUERY.INSERT_SUBJECTS, [merged], (error, results) => {
    if (error || !results) {
      log.error(error.message);
      return;
    } else {
      log.info("Subjects inserted: " + results.affectedRows);
      return;
    }
  });
};


await getEpisodeData();
await getDates();
await getSubjects();

await mergeEpisodes(episodedata, dates, episodes);
await mergeSubjects(arrayOfSubjects, episodes);
await mergeColors(arrayOfColors, episodes);
