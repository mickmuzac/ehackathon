//modules
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var RedditStrategy = require('passport-reddit').Strategy;
var session = require('express-session');

var config = require('./config.json');
var models  = require('./models');

//app
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new RedditStrategy({
    clientID: config.redditKey,
    clientSecret: config.redditSecret,
    callbackURL: "http://localhost:3000/auth/reddit/callback",
    scope: ['identity', 'mysubreddits'],
  },
  function(accessToken, refreshToken, profile, done) {
    models.User.findOne({ 
      where: {username: profile.name }
    })
    .success(function(user) {
      //add extra criteria here to prevent gaming(registration date, maybe an api call to check if they belong to r/startups)
      if(user === null) {
        models.User.create({
          username: profile.name
        })
        .then(function() {
          console.log(profile.name + ' successfully registered!');
        })
      }
      
    })
    .error(function(err) {
      console.log(err);
    });
    // asynchronous verification, for effect...
    process.nextTick(function() {
      return done(null, profile);
    });
  }
));

//express init
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());


//session/auth stuff
app.use(session({
  secret: config.sessionSecret
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

//routes
var routes = require('./routes/index');
var auth = require('./routes/authReddit.js')(passport);
var profile = require('./routes/profile');

app.use('/', routes);
app.use('/auth', auth);
app.use('/profile', profile);

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
