var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

//Routes
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');

var app = express();

//CORS
app.use(require('cors')());


//Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//DB
const keys = require('./config/keys');
mongoose
	.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
	.then(() => {console.log('DB Connection Successful')})
	.catch(err => {console.log('DB Connection Failed\n' + err)});

//Passport
app.use(passport.initialize());
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/v1', apiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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



//Socket.io
const io = require('socket.io');
app.io = io({
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

// TODO : Handle users that have signed-in before server starts
// -> do have sid, but it is not managed in server(need user info)
app.io.on('connection',require('./socketHandler'));

module.exports = app;
