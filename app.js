if(process.env.NODE_ENV != 'production')
{
  require('dotenv').config()
}

//Libraries
var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')

const initializePassport = require('./passport-config');
initializePassport( passport, email => users.find(user => user.email == email),
                    id => users.find(user => user.id == id) )

//Store user data, replace with a database for next homework
const users = [];
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/register');
const { resolveTxt } = require('dns');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: false}))
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
//app.use('/users', usersRouter);
//app.use('/login', indexRouter);

// Routes
app.get('/main', checkAuthenticated, (req, res) => {
  res.render('main', { title: 'main page'})
})

app.post('/main', checkNotAuthenticated, (req, res) => {
    res.redirect('/')
})

app.get('/', checkNotAuthenticated, (req, res) => {
  res.render('index', { title: 'login page'})
})

app.post('/', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/main',
  failureRedirect: '/',
  failureFlash: true
}))


app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register', { title: 'register page'})
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      email: req.body.email,
      password: hashedPassword,
      terms: req.body.checkbox
    })
 


    res.redirect('/')
  } catch {
      if(terms != 'on'){res.redirect('/register')}
    res.redirect('/register')
  }

  console.log(users)
})


app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/')
})


app.get('/imagefinder', checkNotAuthenticated, (req, res) => {
  res.render('imagefinder', { title: 'image finder page'})
  res.redirect('/imagefinder')
})


app.get('/pod', checkNotAuthenticated, (req, res) => {
  res.render('pod', { title: 'picture of the page'})
  res.redirect('/pod')
})

app.get('/neof', checkNotAuthenticated, (req, res) => {
  res.render('neof', { title: 'near earth object finder page'})
  res.redirect('/neof')
})

app.get('/settings', checkNotAuthenticated, (req, res) => {
  res.render('settings', { title: 'settings page'})
  res.redirect('/settings')
})

function checkAuthenticated(req, res, next)
{
  if(req.isAuthenticated())
  {
    return next()
  }
  res.redirect('/')
}

function checkNotAuthenticated(req, res, next)
{
  if(req.isAuthenticated())
  {
    return res.redirect('/main')
  }
  next()
}


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
