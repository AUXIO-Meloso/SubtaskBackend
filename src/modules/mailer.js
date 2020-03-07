const { resolve } = require('path');
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');

const { host, port, user, pass } = require('../config/mailer.json');

const transport = nodemailer.createTransport({
    host,
    port,
    auth: { user, pass }
});


const viewPath = resolve('__dirname', '..', 'src', 'app', 'resources', 'mail');
transport.use('compile', hbs({
    viewEngine: {
        extName: '.html',
        partialsDir: resolve(viewPath),
        layoutsDir: resolve(viewPath),
        defaultLayout: '',
    },
    viewPath,
    extName: '.html'
}));

module.exports = transport;