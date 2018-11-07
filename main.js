const express = require('express');
const path = require('path');
const ejs = require('ejs');
const cons = require('consolidate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const url = require('url');

const app = express();
const port = process.env.PORT || 8080;

// changes working directory of the process to the directory this file is in
process.chdir(__dirname);

// assign the ejs engine to .html files
app.engine('ejs', cons.ejs);

// set .ejs as the default extension
app.set('view engine', 'ejs');
app.set('views', '/build/server/ejs');


// logging
app.use((req, res, next) => {
    console.log("%s | %s | %s | %s | %s",
                req.headers.host,
                new Date().toString(),
                req.method,
                req.url,
                req.headers['user-agent']);
    next();
});


});


// css
app.use('/css',    express.static('build/css'));

// html
app.use('/html',   express.static('build/html'));

// js
app.use('/js',     express.static('build/js'));

// static
app.use('/static', express.static('build/static'));


// Error handler
app.use((err, req, res, next) => {
    res.sendStatus(404);
});



// for parsing cookies
app.use(cookieParser());

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// ejs
app.get('/server/ejs/*', (req, res, next) => {
    // sends file to user
    res.render(req.params[0], {site_name: 'Design Hub Contract Tracker'});
});


// Error handler
app.use((err, req, res, next) => {
    res.sendStatus(500);
});


// No route found
app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
