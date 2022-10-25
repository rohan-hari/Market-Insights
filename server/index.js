const express = require('express');
const app = express();
const cors = require('cors');
const dbConnect = require('./dbConnect');
require('dotenv/config');

app.use(express.json());
app.use(cors());

dbConnect();

// // Only needed to run first time - initialConfig()
// // const initialConfig = require('./config/initialConfig');
// // initialConfig()
// //   .then((docs) => console.log('Data added to MongoDB'))
// //   .catch((err) => console.log(err));

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
