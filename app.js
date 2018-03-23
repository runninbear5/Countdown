var express       = require('express');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var passport      = require('passport');
var session       = require("express-session");
var mongoose      = require('mongoose');

var config        = require('./config');

var index = require('./routes/index');
var auth = require('./routes/auth');

var mongoDB = 'mongodb://'+config.db.username+':'+config.db.password+'@'+config.db.host+'/'+config.db.dbname;
mongoose.Promise = global.Promise;
mongoose.connect(mongoDB, { useMongoClient: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({ secret: 'team parad0x', resave: true, saveUninitialized: true}));
app.use(passport.initialize())
app.use(passport.session())

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/auth', auth);

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
  res.send(err.message);
});

module.exports = app;
