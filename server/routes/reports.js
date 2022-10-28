const router = require('express').Router();
const Report = require('../models/Report');

router.get('/reports', async (req, res) => {
  try {
    let filterQuery = {};

    Object.keys(req.query).forEach((k) => {
      filterQuery[k] = req.query[k].split(`,`);
    });

    const reports = await Report.find(filterQuery);
    res.send(reports);
  } catch (err) {
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

router.get('/filterOptions', async (req, res) => {
  try {
    const filterOptions = {},
      filters = [
        'end_year',
        'topic',
        'sector',
        'region',
        'pestle',
        'source',
        'country',
      ];
    for (let i of filters) {
      filterOptions[i] = await Report.distinct(i);
    }
    res.send([filterOptions]);
  } catch (err) {
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

module.exports = router;
