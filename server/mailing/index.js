const nodemailer = require('nodemailer');
const mailerhbs = require('nodemailer-express-handlebars');
const path = require('path');

const mailer = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PWD,
  },
});

mailer.use('compile', mailerhbs({
  viewPath: path.join(__dirname, '.', 'views'),
  extName: '.hbs',
}));

exports.interface = mailer;
