const router = require('express').Router();
const Report = require('../models/Report');

router.get('/reports', async (req, res) => {
  try {
    let filters = {};
    const filterMap = {
      y: 'end_year',
      t: 'topic',
      s: 'sector',
      r: 'region',
      src: 'source',
      p: 'pestle',
      c: 'country',
      city: 'city',
    };
    Object.keys(req.query).forEach((k) => {
      filters[filterMap[k]] = req.query[k].split(`,`);
    });
    const reports = await Report.find(filters);
    res.send(reports);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: true, message: 'Internal Server Error' });
  }
});

module.exports = router;
