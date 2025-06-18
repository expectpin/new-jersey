const Device = require('../models/Device');

exports.getAllDevices = async (req, res) => {
  try {
    const devices = await Device.findAll();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch devices' });
  }
};

exports.getDeviceById = async (req, res) => {
  try {
    const device = await Device.findByPk(req.params.id);
    if (device) {
      res.json(device);
    } else {
      res.status(404).json({ error: 'Device not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch device' });
  }
};

exports.createDevice = async (req, res) => {
  try {
    const device = await Device.create(req.body);
    res.status(201).json(device);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create device', details: error.message });
  }
};

exports.updateDevice = async (req, res) => {
  try {
    const [updated] = await Device.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedDevice = await Device.findByPk(req.params.id);
      res.json(updatedDevice);
    } else {
      res.status(404).json({ error: 'Device not found' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Failed to update device' });
  }
};

exports.deleteDevice = async (req, res) => {
  try {
    const deleted = await Device.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Device not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete device' });
  }
};