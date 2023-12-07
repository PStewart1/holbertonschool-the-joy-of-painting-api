import { Sequelize } from 'sequelize';
import { sequelize } from '../mysql.config.js';
import Episodes from './episode.js';
import Colors from './colors.js';
import Subjects from './subjects.js';
import log from '../../src/util/logger.js';

// connect to database
await sequelize.authenticate()
  .then(() => {
    log.info('Database connected successfully.');
  })
  .catch((error) => {
    log.error('Unable to connect to database:', error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.episodes = Episodes;
db.colors = Colors;
db.subjects = Subjects;
await db.sequelize.sync({ force: false }).then(() => {
  log.info('Re-sync db complete');
});

export default db;
