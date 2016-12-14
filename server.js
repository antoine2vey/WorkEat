const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const mongoose = require('mongoose');
const User = require('./src/server/models/user.model');
const env = require('dotenv');

const app = express();
const DEV = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 3000;
const sessionDB = 'mongodb://localhost:27017/WorkEat';

/**
 * ENV CONFIG
 */
env.config();

if (DEV) {
  require('pmx').init({
    http: true,
  });
}
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

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username }, (err, user) => {
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
app.use('/public/uploads', express.static(path.join(__dirname, '/public/uploads')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(expressValidator({
  customValidators: {
    isArray(value) {
      return Array.isArray(value);
    },
  },
}));
app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  store: new MongoStore({
    url: sessionDB,
    autoReconnect: true,
  }),
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

const userRoute = require('./src/server/api/users.api');
const productsApi = require('./src/server/api/products.api');
const tagApi = require('./src/server/api/tags.api');
const placeApi = require('./src/server/api/places.api');
const payment = require('./src/server/api/payment.api');

const authorizeRequest = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send('Unauthorized. Please login.');
  }
};
const isAdmin = (req, res, next) => {
  if (req.user.isAdmin && req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({
      error: 'Unauthorized. Adminstrator only.',
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
app.delete('/account/delete', authorizeRequest, userRoute.delete);
app.put('/account/update', authorizeRequest, userRoute.update);

app.get('/protected', authorizeRequest, (req, res) => {
  res.send({
    message: 'This is a protected route only visible to authenticated users.',
    name: req.user.surname,
  });
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

// LIVRAISON API
app.get('/api/livraison/places', isAdmin, placeApi.list);
app.post('/api/livraison/places', isAdmin, placeApi.create);
app.delete('/api/livraison/places/:id', isAdmin, placeApi.delete);

// STRIPE
app.post('/payment/:id', authorizeRequest, payment.send);

app.all('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 C'EST PARTI SUR LE PORT ${PORT} 🚀`);
});
