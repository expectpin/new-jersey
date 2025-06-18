const Category = require('./Category');
const Device = require('./Device');

// Uma Categoria tem muitos Dispositivos
Category.hasMany(Device, {
  foreignKey: {
    name: 'category_id',
    allowNull: false
  }
});

// Um Dispositivo pertence a uma Categoria
Device.belongsTo(Category, {
  foreignKey: {
    name: 'category_id',
    allowNull: false
  }
});