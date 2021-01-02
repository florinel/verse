const axios = require('axios');
const xml2js = require('xml2js');
const debug = require('debug')('app:bibleService');

const parser = xml2js.Parser({ explicitArray: false });

function bibleService() {
  function getVerseById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`https://labs.bible.org/api/?passage=${id}&type=xml`)
        .then((response) => {
          parser.parseString(response.data, (err, result) => {
            if (err) {
              debug(err);
            } else {
              debug(result);
              resolve(result.bible);
            }
          });
        })
        .catch((error) => {
          reject(error);
          debug(error);
        });
    });
  }
  return {
    getVerseById
  };
}

module.exports = bibleService();
