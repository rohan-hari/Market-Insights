const mongoose = require('mongoose');

const dbConnect = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'market-insights',
  };
  mongoose
    .connect(process.env.DATABASE_CONN_URL, connectionParams)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = dbConnect;
