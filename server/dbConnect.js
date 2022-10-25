const mongoose = require('mongoose');

const dbConnect = () => {
  const connectionParams = { useNewUrlParser: true };
  mongoose.connect(process.env.DATABASE_CONN_URL, connectionParams);

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });
  mongoose.connection.on('error', (err) => {
    console.log('Error while connecting to MongoDB');
  });
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
};

module.exports = dbConnect;
