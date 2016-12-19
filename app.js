const express = require('express');
const nunjucks = require('express-nunjucks');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const locals = require('app/locals');
const routes = require('app/routes');
const filters = require('app/core/filters');
const os = require('os');
const path = require('path');

const PORT = 3000;

exports.init = () => {

    const app = express();

    app.set('view engine', 'html');
    app.set('views', [
        __dirname + '/lib/',
        __dirname + '/app/views',
        __dirname + '/app/modules/trackyourappeal',
        __dirname + '/app/modules/abouthearing'
    ]);

    nunjucks(app, {
        autoescape: true,
        watch: true,
        noCache: false,
        filters: filters
    });

    // Disallow search index indexing
    app.use(function (req, res, next) {
        // Setting headers stops pages being indexed even if indexed pages link to them.
        res.setHeader('X-Robots-Tag', 'noindex');
        res.setHeader('X-Served-By', os.hostname());
        next();
    });

    app.use('/public', express.static(__dirname + '/public'));
    app.use('/public', express.static(__dirname + '/govuk_modules/govuk_template/assets'));
    app.use('/public', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit'));
    app.use('/public/images/icons', express.static(__dirname + '/govuk_modules/govuk_frontend_toolkit/images'));

    // Elements refers to icon folder instead of images folder
    app.use(favicon(path.join(__dirname, 'govuk_modules', 'govuk_template', 'assets', 'images', 'favicon.ico')));

    // Support for parsing data in POSTs
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(locals);
    app.use('/', routes);

    const server = app.listen(PORT);

    return {app, server};
};
