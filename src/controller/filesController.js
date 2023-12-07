import fs from 'fs';
import { parse } from 'csv-parse';
import path from 'path';
import { URL } from 'url';
import log from '../util/logger.js';
import db from '../../db/model/db.js';

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
  for (let i = 0; i < arr1.length; i++) {
      const episode = {
        episode: arr3[i], // episode
        title: arr1[i][0], // title
        date: arr2[i][1], // date
        url: arr1[i][1], // url
        img_src: arr1[i][2], // img_src
        painting_index: arr1[i][3], // painting_index
        num_colors: arr1[i][4], // num_colors
        color_hexes: arr1[i][5], // color_hexes
        notes: arr2[i][2], // notes
      };
    merged.push(episode);
  }

  const results = await db.episodes.bulkCreate(merged)
    .catch((error) => {
      log.error(error.message);
      return;
    }) 
  log.info("Episodes inserted: " + results.length);
  return;
};

const colorsList = ['Black_Gesso','Bright_Red','Burnt_Umber','Cadmium_Yellow','Dark_Sienna','Indian_Red',
  'Indian_Yellow','Liquid_Black','Liquid_Clear','Midnight_Black','Phthalo_Blue','Phthalo_Green','Prussian_Blue','Sap_Green',
  'Titanium_White','Van_Dyke_Brown','Yellow_Ochre']

async function mergeColors(arr1, arr2) {
  let merged = [];
  for (let i = 0; i < arr1.length; i++) {
    let colors = {episode: arr2[i], Alizarin_Crimson: arr1[i][17]}; // episode, Alizarin_Crimson
    for (let j = 0; j < 17; j++) {
      colors[colorsList[j]] = arr1[i][j];
    }
    merged.push(colors);
  }
  
  const results = await db.colors.bulkCreate(merged)
    .catch((error) => {
      log.error(error.message);
      return;
    }) 

  log.info("Colors inserted: " + results.length);
  return;

};

const subjectsList = ['APPLE_FRAME','AURORA_BOREALIS','BARN','BEACH','BOAT','BRIDGE','BUILDING','BUSHES','CABIN','CACTUS',
  'CIRCLE_FRAME','CIRRUS','CLIFF','CLOUDS','CONIFER','CUMULUS','DECIDUOUS','DIANE_ANDRE','DOCK','DOUBLE_OVAL_FRAME','FARM',
  'FENCE','FIRE','FLORIDA_FRAME','FLOWERS','FOG','FRAMED','GRASS','GUEST','HALF_CIRCLE_FRAME','HALF_OVAL_FRAME','HILLS','LAKE',
  'LAKES','LIGHTHOUSE','MILL','MOON','MOUNTAIN','MOUNTAINS','NIGHT','OCEAN','OVAL_FRAME','PALM_TREES','PATH','PERSON','PORTRAIT',
  'RECTANGLE_3D_FRAME','RECTANGULAR_FRAME','RIVER','ROCKS','SEASHELL_FRAME','SNOW','SNOWY_MOUNTAIN','SPLIT_FRAME','STEVE_ROSS',
  'STRUCTURE','SUN','TOMB_FRAME','TREE','TREES','TRIPLE_FRAME','WATERFALL','WAVES','WINDMILL','WINDOW_FRAME','WINTER','WOOD_FRAMED']

async function mergeSubjects(arr1, arr2) {
  let merged = [];
  for (let i = 0; i < arr1.length; i++) {
    let subjects = {
      episode: arr2[i] // episode
    };
    for (let j = 0; j < arr1[0].length; j++) {
      subjects[subjectsList[j]] = arr1[i][j]
    }
    merged.push(subjects);
  }
  
  const results = await db.subjects.bulkCreate(merged)
    .catch((error) => {
      log.error(error.message);
      throw error.message;
    }) 

  log.info("Subjects inserted: " + results.length);
  return;

  
};

async function initializeDb() {
  await getEpisodeData();
  await getDates();
  await getSubjects();

  await mergeEpisodes(episodedata, dates, episodes);
  await mergeSubjects(arrayOfSubjects, episodes);
  await mergeColors(arrayOfColors, episodes);
}

export default initializeDb;