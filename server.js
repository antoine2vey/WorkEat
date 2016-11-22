const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const PORT = process.env.PORT || 3000;
const logger = require('morgan');
const mongoose = require('mongoose');
const User = require('./src/server/models/user.model');
const sessionDB = 'mongodb://localhost:27017/WorkEat';
const env = require('dotenv');

/**
 * ENV CONFIG
 */
env.config();
process.setMaxListeners(0);
mongoose.connect(sessionDB);

/**
 * APP CONFIG
 * Passport for secure authentication + session
 * Logger to check all requests
 * Enabling proxy for Webpack
 * Serving static files
 * Making /public/uploads available for public pictures uploaded
 * bodyParser for objects
 * validators, parsers, session
 */

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});
passport.use(new LocalStrategy(function(username, password, done) {
  User.findOne({ username: username }, function (err, user) {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false, { message: 'Incorrect username.' });
    }

    if (!user.validatePassword(password, user.password)) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  });
}));
app.use(logger('dev'));
app.enable('trust proxy');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limite: '50mb', extended:true}));
app.use(expressValidator());
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  store: new MongoStore({
    url: sessionDB,
    autoReconnect: true
  }),
  saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());

const userRoute = require('./src/server/api/users.api');
const productsApi = require('./src/server/api/products.api');
const tagApi = require('./src/server/api/tags.api');
const authorizeRequest = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('Unauthorized. Please login.');
  }
};
const isAdmin = (req, res, next) => {
  if(req.user.isAdmin && req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({
      error:'Unauthorized. Adminstrator only.'
    });
  }
};

/**
 * APP API
 * Serve data for every endpoint
 *
 * Every `GET` endpoint should be accessed to anyone, except login and create
 * routes.
 *
 * Every other (POST, PUT, DELETE) should have a middleware :
 *  - authorizeRequest : accessible for a logged user
 *  - isAdmin : accessible for a person that has req.user.isAdmin:true
 *  - isLivreur : accessible for a person that has req.user.isLivreur:true
 *  - isPrestataire : accessible for a person that has req.user.isPrestataire:true
 */

// ACCOUNT API
app.get('/account/logout', userRoute.logout);
app.get('/account/list', userRoute.list);
app.post('/account/login', userRoute.login);
app.post('/account/create', userRoute.create);
app.post('/account/delete', authorizeRequest, userRoute.delete);
app.post('/account/update', authorizeRequest, userRoute.update);

app.get('/protected', authorizeRequest, function(req, res){
  res.send('This is a protected route only visible to authenticated users.');
});

// PRODUCT API
app.get('/api/products', productsApi.list);
app.post('/api/products/create', isAdmin, productsApi.create);
// app.post('/api/products/update/:id', productsApi.update);
app.delete('/api/products/:id', isAdmin, productsApi.delete);

// TAG API
app.get('/api/tags', tagApi.list);
app.get('/api/tags/:id', tagApi.listOne);
app.post('/api/tags/create', isAdmin, tagApi.create);
app.delete('/api/tags/:id', isAdmin, tagApi.delete);
app.put('/api/tags/:id', isAdmin, tagApi.update);


app.all('/*', function(req, res) {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, function() {
    console.log('Server running on ' + PORT);
});
