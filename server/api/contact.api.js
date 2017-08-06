const nodemailer = require('nodemailer');
const User = require('../models/user.model');

exports.contact = async (req, res) => {
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('message', 'Message is required').notEmpty();
  const user = await User.findById(req.user.id).select('surname name');

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).send(errors);
  }

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PWD,
    },
  }, {
    from: 'WorkEat <noreply@workeat.io>',
  });

  const message = {
    from: 'WorkEat',
    to: process.env.GMAIL_ADDRESS,
    subject: `Contact de ${user.surname} ${user.name}`,
    text: req.body.message,
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log('Error', err);
      return res.status(500).send('Un problème est survenu');
    }

    console.log('Message sent', info);
    transporter.close();

    res.status(200).send('Mail envoyé!');
  });
};
