const express = require('express');
const path = require('path');
const ejs = require('ejs');
const cons = require('consolidate');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const url = require('url');

const app = express();
const port = process.env.PORT || 8080;



// helper function
var static_middleware = (path_to_static_files) => {
    return express.static(path.join(__dirname, path_to_static_files));
};


// for parsing cookies
app.use(cookieParser());

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));


// assign the ejs engine to .html files
app.engine('ejs', cons.ejs);

// set .ejs as the default extension
app.set('view engine', 'ejs');
app.set('views', __dirname + '/build/server/ejs');


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


// Error handler
app.use((err, req, res, next) => {
    res.sendStatus(500);
});

// css
app.use('/css', static_middleware('build/css'));

// html
app.use('/html', static_middleware('build/html'));

// js
app.use('/js', static_middleware('build/js'));

// static
app.use('/static', static_middleware('build/static'));


// Error handler
app.use((err, req, res, next) => {
    res.sendStatus(500);
});
// ejs
app.get('/server/ejs/*', (req, res, next) => {
    // sends file to user
    res.render(req.params[0], {site_name: 'Design Hub Contract Tracker'});
});


// Error handler
app.use((err, req, res, next) => {
    res.sendStatus(500);
});


// js
app.post('/server/js/', (req, res, next) => {
});


// No route found
app.use((req, res) => {
    res.sendStatus(404);
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
