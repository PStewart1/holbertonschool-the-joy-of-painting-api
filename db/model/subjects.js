import {sequelize} from '../mysql.config.js';
import { DataTypes } from 'sequelize';

const Subjects = sequelize.define('subjects', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  episode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  APPLE_FRAME: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  AURORA_BOREALIS: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  BARN: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  BEACH: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  BOAT: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  BRIDGE: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  BUILDING: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  BUSHES: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  CABIN: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  CACTUS: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  CIRCLE_FRAME: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  CIRRUS: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  CLIFF: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  CLOUDS: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  CONIFER: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  CUMULUS: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  DECIDUOUS: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  DIANE_ANDRE: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  DOCK: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  DOUBLE_OVAL_FRAME: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  FARM: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  FENCE: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  FIRE: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  FLORIDA_FRAME: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  FLOWERS: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  FOG: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  FRAMED: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  GRASS: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  GUEST: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  HALF_CIRCLE_FRAME: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  HALF_OVAL_FRAME: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  HILLS: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  LAKE: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  LAKES: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  LIGHTHOUSE: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  MILL: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  MOON: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  MOUNTAIN: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  MOUNTAINS: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  NIGHT: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  OCEAN: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  OVAL_FRAME: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  PALM_TREES: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  PATH: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  PERSON: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  PORTRAIT: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  RECTANGLE_3D_FRAME: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  RECTANGULAR_FRAME: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  RIVER: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  ROCKS: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  SEASHELL_FRAME: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  SNOW: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  SNOWY_MOUNTAIN: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  SPLIT_FRAME: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  STEVE_ROSS: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  STRUCTURE: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  SUN: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  TOMB_FRAME: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  TREE: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  TREES: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  TRIPLE_FRAME: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  WATERFALL: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  WAVES: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  WINDMILL: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  WINDOW_FRAME: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  WINTER: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  WOOD_FRAMED: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false
});

export default Subjects;
