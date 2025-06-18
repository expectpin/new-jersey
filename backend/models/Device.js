const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Device = sequelize.define('Device', {
  color: {
    type: DataTypes.STRING(16),
    allowNull: false,
  },
  partNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Device;