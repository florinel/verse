/* eslint-disable no-trailing-spaces */
const express = require('express');
const verseController = require('../controllers/verseController');

const verseRouter = express.Router();
const verseService = require('../services/bibleService');

function router(nav) {
  const { getIndex, getById, middleware } = verseController(verseService, nav);
  verseRouter.use(middleware);
  verseRouter.route('/')
    .get(getIndex);

  verseRouter.route('/:id')
    .get(getById);
  return verseRouter;
}


module.exports = router;