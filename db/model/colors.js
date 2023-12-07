import {sequelize} from '../mysql.config.js';
import { DataTypes } from 'sequelize';


const Colors = sequelize.define('colors', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  episode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Alizarin_Crimson: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Black_Gesso: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Bright_Red: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Burnt_Umber: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Cadmium_Yellow: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Dark_Sienna: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Indian_Red: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Indian_Yellow: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Liquid_Black: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Liquid_Clear: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Midnight_Black: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Phthalo_Blue: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Phthalo_Green: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Prussian_Blue: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Sap_Green: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Titanium_White: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  Van_Dyke_Brown: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  Yellow_Ochre: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  freezeTableName: true,
  timestamps: false
});

export default Colors;