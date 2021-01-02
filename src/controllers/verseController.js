const { MongoClient, ObjectID } = require('mongodb');
const debug = require('debug')('app:verseController');

function verseController(verseService, nav) {
  function getIndex(req, res) {
    const url = 'mongodb://localhost:27017';
    const dbName = 'verseApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('verses');

        const verses = await col.find().toArray();

        res.render(
          'verseListView',
          {
            nav,
            title: 'verse list',
            verses
          }
        );
      } catch (err) {
        debug(err.stack);
      }
      client.close();
    }());
  }
  function getById(req, res) {
    const { id } = req.params;
    const url = 'mongodb://localhost:27017';
    const dbName = 'verseApp';

    (async function mongo() {
      let client;
      try {
        client = await MongoClient.connect(url);
        debug('Connected correctly to server');

        const db = client.db(dbName);

        const col = await db.collection('verses');

        const verse = await col.findOne({ _id: new ObjectID(id) });
        debug(verse);

        // eslint-disable-next-line no-underscore-dangle
        verse.details = await verseService.getVerseById(verse._id);
        res.render(
          'verseView',
          {
            nav,
            title: 'verse',
            verse
          }
        );
      } catch (err) {
        debug(err.stack);
      }
    }());
  }
  function middleware(req, res, next) {
    // if (req.user) {
    next();
    // } else {
    // res.redirect('/');
    // }
  }
  return {
    getIndex,
    getById,
    middleware
  };
}

module.exports = verseController;
