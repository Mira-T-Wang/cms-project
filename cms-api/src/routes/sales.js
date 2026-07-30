const express = require('express');
const router = express.Router();
const { getPaginated } = require('../controllers/salesController');

router.get('/', getPaginated);

module.exports = router;