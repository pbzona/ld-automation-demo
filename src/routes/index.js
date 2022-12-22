const express = require('express');
const { createItem } = require('./create');
const { deleteAll } = require('./deleteAll');
const { searchForItem } = require('./search');
const { seedItems } = require('./seed');

const router = express.Router();

router.get('/search', searchForItem);
router.post('/', createItem);
router.post('/seed/:num', seedItems);
router.delete('/deleteAll', deleteAll);

module.exports = { router };