/* eslint global-require: "off" */
const weAreInProduction = process.env.NODE_ENV === 'production';
const fs = require('fs');
const app = require('express')();
const Product = require('../models/product.model');

let server;
if (weAreInProduction) {
  server = require('https').createServer({
    key: fs.readFileSync('/etc/letsencrypt/live/dev.antoinedeveyrac.io/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/dev.antoinedeveyrac.io/cert.pem'),
  }, app);
} else {
  server = require('http').Server(app);
}
const io = require('socket.io')(server);

module.exports = () => {
  io.on('connection', (socket) => {
    socket.on('DECREMENT_QUANTITY', (id) => {
      Product.findByIdAndUpdate(id, { $inc: { stock: -1 } }, (err, product) => {
        try {
          io.sockets.emit('DECREMENT_QUANTITY', {
            id: product._id,
          });
        } catch (e) {}
      });
    });

    socket.on('INCREMENT_QUANTITY', ({ id, quantity }) => {
      Product.findByIdAndUpdate(id, { $inc: { stock: +quantity } }, (err, product) => {
        try {
          io.sockets.emit('INCREMENT_QUANTITY', {
            id: product._id,
            quantity,
          });
        } catch (e) {}
      });
    });
  });

  server.listen(3005);
};
