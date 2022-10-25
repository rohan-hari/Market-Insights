const express = require('express');
const app = express();
const cors = require('cors');
const dbConnect = require('./dbConnect');
require('dotenv/config');

const port = process.env.PORT;
const reports = require('./routes/reports');

app.use(express.json());
app.use(cors());

dbConnect();

// // Only needed to run first time - initialConfig()
// // const initialConfig = require('./config/initialConfig');
// // initialConfig()
// //   .then((docs) => console.log('Data added to MongoDB'))
// //   .catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send(`To view all data, go to - localhost:${port}/api/reports`);
});
app.set('json spaces', 2);
app.use('/api', reports);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
