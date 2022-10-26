const router = require('express').Router();
const Report = require('../models/Report');

const filterMap = {
  y: 'end_year',
  t: 'topic',
  s: 'sector',
  r: 'region',
  src: 'source',
  p: 'pestle',
  c: 'country',
};

router.get('/reports', async (req, res) => {
  try {
    let filterQuery = {};
    Object.keys(req.query).forEach((k) => {
      filterQuery[filterMap[k]] = req.query[k].split(`,`);
    });
    const reports = await Report.find(filterQuery);
    res.send(reports);
  } catch (err) {
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

router.get('/filterOptions', async (req, res) => {
  try {
    let filterOptions = {};
    for (let i of Object.values(filterMap)) {
      filterOptions[i] = await Report.distinct(i);
    }
    res.send([filterOptions]);
  } catch (err) {
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

module.exports = router;
