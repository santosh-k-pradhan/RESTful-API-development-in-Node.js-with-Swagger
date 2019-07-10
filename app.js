'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var cors = require('cors');
const addRequestId = require('express-request-id')();
const morgan = require('morgan');
var FileStreamRotator = require('file-stream-rotator');
const fs = require('fs');

var path = require('path');
var logDirectory = path.join(require('app-root-dir').get(), 'logs');

app.use(cors());
app.use(addRequestId);

morgan.token('id', function getId(req) {
  return req.id
});

var loggerFormat = ':id [:date[web]] ":method :url" :status :response-time';
//var loggerFormat = `[:date[web]] ${":method"}`;

var _fileStream = FileStreamRotator.getStream({
  filename: logDirectory + '/access-%DATE%.log',
  date_format:('YYYYMMDD')
})

app.use(morgan(loggerFormat, {
  skip: function (req, res) {
      return res.statusCode < 400
  },
  stream: process.stderr
}));

app.use(morgan(loggerFormat, {
  skip: function (req, res) {
      return res.statusCode >= 400
  },
  stream: process.stdout
}));

//app.use(morgan('common', {stream: fs.createWriteStream('./access-%DATE%.log', {flags: 'a'})}));
app.use(morgan('common', {stream: _fileStream}));

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  // install middleware
  swaggerExpress.register(app);
  var port = process.env.PORT || 10010;

  mongoose.Promise = bluebird;
  mongoose.connect('mongodb://localhost/movieDB', { useNewUrlParser: true });
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
  mongoose.connection.once('open', function(){
      app.listen(port);
  });

  if (swaggerExpress.runner.swagger.paths['/movie']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/movie');
  }
});
