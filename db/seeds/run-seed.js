const devData = require('../../db/data/development-data/index.js');
const seed = require('./seed.js');
const db = require('../../db/connection.js');

const runSeed = () => {
  return seed(devData.exhibitionData)
      .then(() => db.end());
};

runSeed();