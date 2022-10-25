const Report = require('../models/report');
const reports = require('./jsondata.json');

const initialConfig = async () => {
  try {
    const docs = await Report.insertMany(reports);
    return Promise.resolve(docs);
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports = initialConfig;
