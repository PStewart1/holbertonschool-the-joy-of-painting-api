import { sequelize } from '../mysql.config.js';
import { DataTypes } from 'sequelize';
// import log from '../../src/util/logger.js';

const Episodes = sequelize.define('episodes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  episode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img_src: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  painting_index: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  num_colors: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  color_hexes: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  freezeTableName: true,
  timestamps: false
});

// Episodes.sync()
//   .then(() => {
//     log.info(`Table ${sequelize.models.episodes} synced.`);
//   })
//   .catch((error) => {
//     log.error('Error syncing Episodes table:', error);
//   });

export default Episodes;
