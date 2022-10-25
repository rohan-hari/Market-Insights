const express = require('express');
const app = express();
const cors = require('cors');
const dbConnect = require('./dbConnect');

dbConnect();

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port: ${3000}`);
});
