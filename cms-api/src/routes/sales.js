const express = require('express');
const router = express.Router();
const { getPaginated, create, update, remove, getSummary } = require('../controllers/salesController');

router.get('/', getPaginated);
router.get('/summary', getSummary);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;