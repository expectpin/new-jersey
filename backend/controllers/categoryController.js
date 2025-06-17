const Category = require('../models/category');

exports.getAll = async (req, res) => {
  const categories = await Category.findAll();
  res.json(categories);
};

exports.create = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'Name is required' });
  const category = await Category.create({ name });
  res.status(201).json(category);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await Category.destroy({ where: { id } });
  res.status(204).send();
};