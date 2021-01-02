/* eslint-disable no-trailing-spaces */
const express = require('express');
const {
  MongoClient
} = require('mongodb');
const debug = require('debug')('app:adminRoutes');

const adminRouter = express.Router();

const verses = [
  {
    reference: 'John 3:16',
    text: 'For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.'
  },
  {
    reference: 'John 17:9-11',
    text: 'I am no more in the world, but these are in the world, and I am coming to you. Holy Father, keep them through your name which you have given me, that they may be one, even as we are.'
  }
];


function router(nav) {
  adminRouter.route('/')
    .get((req, res) => {
      const url = 'mongodb://localhost:27017';
      const dbName = 'verseApp';

      (async function mongo() {
        let client;
        try {
          client = await MongoClient.connect(url);
          debug('Connected correctly to server');

          const db = client.db(dbName);

          const response = await db.collection('verses').insertMany(verses);
          res.json(response);
        } catch (err) {
          debug(err.stack);
        }

        client.close();
      }());
    });
  return adminRouter;
}

module.exports = router;
