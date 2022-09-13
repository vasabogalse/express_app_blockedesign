const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const createProjectRouter = require('./routes/createProject');
const assignStateRouter = require('./routes/assignState');
//const { hasSubscribers } = require('diagnostics_channel');
const directoryPartials = path.join(__dirname, 'partials');

const app = express();
const hbs = require('hbs');

// view engine setup
hbs.registerPartials(directoryPartials);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/stylesheets', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.use('/fa', express.static(path.join(__dirname, '/node_modules/font-awesome/css')));
app.use('/fonts', express.static(path.join(__dirname, '/node_modules/font-awesome/fonts')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/createProject', createProjectRouter);
app.use('/assignState', assignStateRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
