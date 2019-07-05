const express = require('express');
const path = require('path');
const serve = require('serve-static');

const app = express();
const port = process.env.PORT || 5000;

//trigger branch build
app.use(serve(__dirname + '/build'));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname + '/build', 'index.html'));
});

app.listen(port);
console.log('Server running on ' + port + '...');
