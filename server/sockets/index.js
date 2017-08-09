/* eslint global-require: "off" */
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Product = require('../models/product.model');

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

  http.listen(3005);
};
