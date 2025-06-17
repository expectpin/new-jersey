const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Category = require('./category');

const Device = sequelize.define('Device', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    }
  },
  color: {
    type: DataTypes.STRING(16),
    allowNull: false
  },
  partNumber: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  }
});

module.exports = Device;