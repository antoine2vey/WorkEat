/* eslint global-require: "off" */
const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const Product = require('../models/product.model');

exports.index = () => {
  io.on('connection', (socket) => {
    socket.on('decreaseQuantity', (id) => {
      Product.findByIdAndUpdate(id, { $inc: { stock: -1 } }, (err, product) => {
        // Notify everyone that this product is decreasing!!
        io.sockets.emit('updateQuantity', product._id);
      });
    });
  });

  http.listen(3005);
};
