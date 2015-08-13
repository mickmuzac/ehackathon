//modules
var express = require('express'),
  path = require('path'),
  favicon = require('serve-favicon'),
  logger = require('morgan'),
  cookieParser = require('cookie-parser'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  RedditStrategy = require('passport-reddit').Strategy,
  session = require('express-session');

var env = process.env.NODE_ENV || 'development';
var config = require('./config/config.json')[env];
var dal = require('./models/dal');

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
    callbackURL: config.redditCallback,
    scope: ['identity', 'mysubreddits']
  },
  function(accessToken, refreshToken, profile, done) {
    dal.findOrCreateUser(profile.name, function(err, user, created) {
        if(created){
          dal.addUserToLatestEvent(user, function(err){
            console.log("Result of adding user to event: ", err);
          });
        }

        process.nextTick(function() {
          return done(null, user);
        });
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
var teams = require('./routes/teams');
var api = require('./routes/api/api.v1.js');

app.use('/', routes);
app.use('/auth', auth);
app.use('/profile', profile);
app.use('/teams', teams);
app.use('/api/v1', api);

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
