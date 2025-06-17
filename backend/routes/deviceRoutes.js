const express = require('express');
const router = express.Router();
const deviceController = require('../controllers/deviceController');

router.get('/', deviceController.getAll);
router.post('/', deviceController.create);
router.delete('/:id', deviceController.delete);

module.exports = router;