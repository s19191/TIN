const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const i18n = require('i18n');
var cors = require('cors');

const indexRouter = require('./routes/index');
const ksiazkaRouter = require('./routes/ksiazkaRoute');
const magazynRouter = require('./routes/magazynRoute');
const stanWMagazynieRouter = require('./routes/stanWMagazynieRoute');
const ksiazkaApiRouter = require('./routes/api/KsiazkaApiRoute');
const magazynApiRouter = require('./routes/api/MagazynApiRoute');
const stanWMagazynieApiRouter = require('./routes/api/StanWMagazynieApiRoute');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('secret'));

i18n.configure({
    locales: ['pl', 'en'], // języki dostępne w aplikacji. Dla każdego z nich należy utworzyć osobny słownik
    directory: path.join(__dirname, 'locales'), // ścieżka do katalogu, w którym znajdują się słowniki
    objectNotation: true, // umożliwia korzstanie z zagnieżdżonych kluczy w notacji obiektowej
    cookie: 'tin-ksiegarnia-lang', //nazwa cookies, które nasza aplikacja będzie wykorzystywać do przechowania informacji o języku aktualnie wybranym przez użytkownika
});

app.use(i18n.init);

app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'my_secret_password',
    resave: false
}));

app.use((req, res, next) => {
    const loggedUser = req.session.loggedUser;
    res.locals.loggedUser = loggedUser;
    if(!res.locals.loginError) {
        res.locals.loginError = undefined;
    }
    next();
});

app.use((req, res, next) => {
    if(!res.locals.lang) {
        const currentLang = req.cookies['tin-ksiegarnia-lang'];
        res.locals.lang = currentLang;
    }
    next();
});

app.use('/', indexRouter);
app.use('/ksiazka', ksiazkaRouter);
app.use('/magazyn', magazynRouter);
app.use('/stanWMagazynie', stanWMagazynieRouter);
app.use('/api/ksiazki', ksiazkaApiRouter);
app.use('/api/magazyny', magazynApiRouter);
app.use('/api/stanWMagazynie', stanWMagazynieApiRouter);

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
const sequelizeInit = require('./config/sequelize/init');

sequelizeInit()
    .catch(err => {
        console.log(err);
    });

module.exports = app;