const Device = require('../models/device');

exports.getAll = async (req, res) => {
  const devices = await Device.findAll();
  res.json(devices);
};

exports.create = async (req, res) => {
  const { category_id, color, partNumber } = req.body;
  if (!category_id || !color || !partNumber) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  const device = await Device.create({ category_id, color, partNumber });
  res.status(201).json(device);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Device.destroy({ where: { id } });
  res.status(204).send();
};