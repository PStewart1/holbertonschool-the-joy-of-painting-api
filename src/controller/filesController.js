import fs from 'fs';
import { parse } from 'csv-parse';
import path from 'path';
import { URL } from 'url';

const __dirname = new URL('.', import.meta.url).pathname;

const csvPath1 = path.join(__dirname, 'TheJoyOfPainting-Colors_Used.csv');
let episodedata = [];
let arrayOfColors = [];
const  getEpisodeData = await new Promise((resolve, reject) => {
  fs.createReadStream(csvPath1)
    .pipe(parse({ delimiter: ',', from_line: 2 }))
    .on('data', (row) => {
      episodedata.push({
        title: row[3],
        url: row[7],
        img_src: row[2],
        painting_index: row[1],
        num_colors: row[6],
        color_hex: row[9]
      });
      let colors = [];
      for (let i = 10; i < 28; i++) {
        colors[i - 10] = row[i];
      }
      arrayOfColors.push(colors);
    })
    .on('end', () => {
      // console.log(arrayOfColors);
      // console.log('finished');
      resolve(episodedata);
    })
    .on('error', (error) => {
      console.log(error.message);
      reject(error);
    });
});

let dates = [];
const csvPath2 = path.join(__dirname, 'TheJoyOfPainting-Episode_Dates.csv');
const getDates = await new Promise((resolve, reject) => {
  fs.createReadStream(csvPath2)
    .pipe(parse({ delimiter: [' (', ')'], from_line: 1, relax_column_count: true }))
    .on('data', (row) => {
      dates.push({
        title: row[0],
        date: row[1],
        notes: row[2]
      });
    })
    .on('end', () => {
      // console.log(dates);
      // console.log('finished');
      resolve(dates);
    })
    .on('error', (error) => {
      console.log(error.message);
      reject(error);
    });
});

let arrayOfSubjects = [];
let episodes = [];
const csvPath3 = path.join(__dirname, 'TheJoyOfPainting-Subject_Matter.csv');
const getSubjects = await new Promise((resolve, reject) => {
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
      // console.log(arrayOfSubjects);
      // console.log('finished');
      resolve(arrayOfSubjects);
    })
    .on('error', (error) => {
      console.log(error.message);
      reject(error);
    });
});

function mergeEpisodes(arr1, arr2, arr3) {
  let merged = [];
  for (let i = 0; i < arr1.length; i++) {
    const episode = {
      episode: arr3[i],
      title: arr1[i].title,
      date: arr2[i].date,
      url: arr1[i].url,
      img_src: arr1[i].img_src,
      painting_index: arr1[i].painting_index,
      num_colors: arr1[i].num_colors,
      color_hexes: arr1[i].color_hex,
      notes: arr2[i].notes,
    };
    merged.push(episode);
  }
  return merged;
}

const episodeList = mergeEpisodes(episodedata, dates, episodes);


console.log(merged);
