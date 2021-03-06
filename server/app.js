const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

const users = require('./routes/users');
const groups = require('./routes/groups');
const sentences = require('./routes/sentences');
const usersgroups = require('./routes/usersgroups');
const words = require('./routes/words');

// uncomment after placing your favicon in /public
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/../client')))
app.use(express.static(path.join(__dirname, '/../', 'node_modules')))

app.use('/api/users', users);
app.use('/api/groups', groups);
app.use('/api/sentences', sentences);
app.use('/api/usersgroups', usersgroups);
app.use('/api/words', words);

app.use('*', function(req, res) {
  res.sendFile('index.html', {
    root: path.join(__dirname, '/../client')
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
