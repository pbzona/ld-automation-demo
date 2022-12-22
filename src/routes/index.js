const express = require('express');
const { createItem } = require('./create');
const { searchForItem } = require('./search');

const router = express.Router();

router.get('/search', searchForItem);
router.post('/', createItem);

module.exports = { router };