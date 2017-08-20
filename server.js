/* eslint no-undef: "off", no-unused-vars: "warn" */

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwtExpress = require('express-jwt');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const mongoose = require('mongoose');
const User = require('./server/models/user.model');
const env = require('dotenv');
const pmx = require('pmx');
const bootstrapSockets = require('./server/sockets');
const exphbs = require('express-handlebars');

const app = express();
const DEV = process.env.NODE_ENV === 'development';
const PORT = process.env.PORT || 3001;
const sessionDB = 'mongodb://localhost:27017/WorkEat';

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

/**
* ENV CONFIG
*/
env.config();

if (!DEV) {
  pmx.init({
    http: true,
  });
}

process.setMaxListeners(0);
mongoose.connect(sessionDB);

bootstrapSockets();

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
app.enable('trust proxy');
app.use(express.static(path.join(__dirname, 'public')));
app.use('*/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use(cookieParser());
app.use(bodyParser.json({
  limit: '50mb',
}));
app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false,
}));
app.use(logger('dev'));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  store: new MongoStore({
    url: sessionDB,
    autoReconnect: true,
  }),
  saveUninitialized: true,
  cookie: {
    secure: DEV,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
  customValidators: {
    isArray(value) {
      return Array.isArray(value);
    },
  },
}));

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  (username, password, done) => {
    User
      .findOne({ username })
      .populate('position')
      .exec((err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.validatePassword(password, user.password)) {
          return done(null, false);
        }

        return done(null, user);
      });
  }));

const userRoute = require('./server/api/users.api');
const productsApi = require('./server/api/products.api');
const tagApi = require('./server/api/tags.api');
const placeApi = require('./server/api/places.api');
const payment = require('./server/api/payment.api');
const order = require('./server/api/order.api');
const bundle = require('./server/api/bundle.api');
const article = require('./server/api/article.api');
const csv = require('./server/api/csv.api');
const cart = require('./server/api/cart.api.js');
const messageApi = require('./server/api/contact.api.js');
const livreurApi = require('./server/api/livreur.api.js');

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
const isPresta = (req, res, next) => {
  if (req.user.isPrestataire && req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send({
      error: 'Unauthorized. Prestataire only.',
    });
  }
};
const canOrder = (req, res, next) => {
  const date = new Date();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  if ((hour < 11) || (hour === 11 && minutes < 30)) {
    next();
  } else {
    res.send({
      error: 'Too late to order :(',
    });
  }
};

app.get('**/canOrder', authorizeRequest, canOrder, (req, res) => {
  res.send({
    STATUS: 'You can order!',
  });
});

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
app.post('/account/logout', userRoute.logout);
app.get('/account/list', userRoute.list);
app.post('/account/login', userRoute.login);
app.post('/account/create', userRoute.create);
app.post('/account/forgot', userRoute.forgot);
app.get('/reset/:token', userRoute.reset);
app.post('/reset/:token', userRoute.resetPwd);
app.delete('/account/delete', jwtExpress({ secret: process.env.JWT_SECRET }), userRoute.delete);
app.put('/account/update', jwtExpress({ secret: process.env.JWT_SECRET }), userRoute.update);
app.put('/account/update/solde', jwtExpress({ secret: process.env.JWT_SECRET }), userRoute.updateAmount);

app.get('/protected', authorizeRequest, (req, res) => {
  res.send({
    message: 'This is a protected route only visible to authenticated users.',
    name: req.user.surname,
  });
});

// PRODUCT API
app.get('/api/products', productsApi.list);
app.post('/api/products', jwtExpress({ secret: process.env.JWT_SECRET }), productsApi.create);
// app.post('/api/products/:id', productsApi.update);
app.delete('/api/products/:id', jwtExpress({ secret: process.env.JWT_SECRET }), productsApi.delete);

// TAG API
app.get('/api/tags', tagApi.list);
app.get('/api/tags/:id', tagApi.listOne);
app.post('/api/tags', jwtExpress({ secret: process.env.JWT_SECRET }), tagApi.create);
app.delete('/api/tags/:id', jwtExpress({ secret: process.env.JWT_SECRET }), tagApi.delete);
app.put('/api/tags/:id', jwtExpress({ secret: process.env.JWT_SECRET }), tagApi.update);

// LIVRAISON API
app.get('/api/places', placeApi.list);
app.post('/api/places', jwtExpress({ secret: process.env.JWT_SECRET }), placeApi.create);
app.delete('/api/places/:id', jwtExpress({ secret: process.env.JWT_SECRET }), placeApi.delete);

// STRIPE
app.post('/payment/:id', authorizeRequest, payment.send);

// ORDERS
app.post('/api/orders', jwtExpress({ secret: process.env.JWT_SECRET }), order.create);
app.get('/api/orders/:id', jwtExpress({ secret: process.env.JWT_SECRET }), order.getOne);
app.get('/api/orders', jwtExpress({ secret: process.env.JWT_SECRET }), order.forCurrentUser);

// CART
app.get('/api/cart', authorizeRequest, cart.get);
app.put('/api/cart', authorizeRequest, cart.add);
app.delete('/api/cart/:id', authorizeRequest, cart.delete);

// BUNDLES
app.get('/api/bundles', bundle.list);
app.post('/api/bundles', jwtExpress({ secret: process.env.JWT_SECRET }), bundle.create);
app.delete('/api/bundles/:id', jwtExpress({ secret: process.env.JWT_SECRET }), bundle.delete);

// ARTICLES
app.post('/api/articles', jwtExpress({ secret: process.env.JWT_SECRET }), article.create);
app.get('/api/articles', article.list);
app.get('/api/articles/:id', article.getOne);
app.delete('/api/articles/:id', jwtExpress({ secret: process.env.JWT_SECRET }), article.delete);

// EXPORT CSV
app.post('/api/csv', isPresta, jwtExpress({ secret: process.env.JWT_SECRET }), csv.createFile);

// MAIL
app.post('/api/contact', authorizeRequest, jwtExpress({ secret: process.env.JWT_SECRET }), messageApi.contact);

// LIVREURS
app.post('/api/livreurs', authorizeRequest, jwtExpress({ secret: process.env.JWT_SECRET }), livreurApi.create);
app.post('/livreur/login', livreurApi.login);

app.all('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.listen(PORT, () => {
  console.log(`\n\n🚀 C'EST PARTI SUR LE PORT ${PORT} 🚀\n\n`);
});
