const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const pdf = require('html-pdf');
const moment = require('moment');

moment.locale('fr');

function createPdf(data, res, next) {
  const filePath = `pdf/workeat-${data._id}.pdf`;
  const writeFilePath = `public/${filePath}`;
  fs.readFile(path.join(__dirname, 'recap.hbs'), (err, html) => {
    if (err) {
      return next(err);
    }

    // If file already exists, dont need to block the thread
    if (fs.existsSync(writeFilePath)) {
      return next(true);
    }

    const formattedDate = moment(data.orderedAt).format('Do MMMM YYYY');
    const template = html.toString('UTF-8');
    const makePdf = handlebars.compile(template);
    const __html = makePdf({
      order: data,
      date: formattedDate,
    });

    pdf.create(__html).toFile(writeFilePath, () => {
      next(true);
    });
  });
}

function init(data, res, next) {
  const csvDir = path.join(__dirname, '..', '..', 'public', 'pdf');
  fs.stat(csvDir, (err) => {
    if (err) {
      fs.mkdirSync(csvDir, () => fs.close());
    }
  });

  createPdf(data, res, next);
}

module.exports = init;
