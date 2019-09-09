const express = require('express');
require('./config/db/mongoose');

const port = process.env.PORT;

const app = express();

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/contests', require('./routes/api/contests'));
app.use('/api/picks', require('./routes/api/picks'));

app.listen(port, () => {
  console.log('Sever is up on port: ' + port);
});
