const express = require('express');
require('./config/db/mongoose');

const port = process.env.PORT;

const app = express();

app.listen(port, () => {
  console.log('Sever is up on port: ' + port);
});

app.use(express.json());
