const express = require('express');
const bodyParser = require('body-parser');

const port = 13013;
const app = express();

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/store', require('./api')); // supplies api entry endpoint

app.listen(port, () => {
  console.log('server started on port ' + port);
});

app.get('/', function(req, res) {
  res.send('Api serving you.');
});

// routes app
module.exports = app;
