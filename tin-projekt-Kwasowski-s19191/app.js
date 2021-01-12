const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const ksiazkaRouter = require('./routes/ksiazkaRoute');
const magazynRouter = require('./routes/magazynRoute');
const stanWMagazynieRouter = require('./routes/stanWMagazynieRoute');
const ksiazkaApiRouter = require('./routes/api/KsiazkaApiRoute');
const magazynApiRouter = require('./routes/api/MagazynApiRoute');
const stanWMagazynieApiRouter = require('./routes/api/StanWMagazynieApiRoute');
const sequelizeInit = require('./config/sequelize/init');
const session = require('express-session');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

app.use('/', indexRouter);
app.use('/ksiazka', ksiazkaRouter);
app.use('/magazyn', magazynRouter);
app.use('/stanWMagazynie', stanWMagazynieRouter);
app.use('/api/ksiazki', ksiazkaApiRouter);
app.use('/api/magazyny', magazynApiRouter);
app.use('/api/stanWMagazynie', stanWMagazynieApiRouter);

app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

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

sequelizeInit()
    .catch(err => {
        console.log(err);
    });

module.exports = app;