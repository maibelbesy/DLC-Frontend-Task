const express = require('express'),
  path = require('path'),
  compression = require('compression'),
  helmet = require('helmet'),
  app = express();

app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'node_modules')));

//Serve the angular app
app.use(function (req, res, next) {
  //to always give back the angular application
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

module.exports = app;