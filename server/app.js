var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/user');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
require("dotenv").config();

var cors = require('cors')

var app = express();

app.listen(process.env.PORT || 3001);
app.use(cors());
//body-parser setup
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//mongoose-setup
mongoose.Promise = global.Promise;
console.log("Testeing..: ", process.env.MONGODB_URI);
mongoose.createConnection(process.env.MONGODB_URI);

var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function() {
  console.log("Connected to mogodb server");
});

//mongodb://localhost/<db-name>
mongoose.connect(process.env.MONGODB_URI);

console.log(".....................");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

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

module.exports = app;
