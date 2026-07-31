const express = require('express');
const router = express.Router();
const { getPaginated, create, update, remove } = require('../controllers/salesController');

router.get('/', getPaginated);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

module.exports = router;