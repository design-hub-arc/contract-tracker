// changes working directory of the process to the directory this file is in
process.chdir(__dirname);

// allows for multiple secrets files but only one can be used at a time
const SECRETS_FILE = process.env.SECRETS_FILE || 'secrets.js';

// set environmental variables using the key value pairs in the secrets file
const secrets = require(`./${SECRETS_FILE}`);
for (var key in secrets)
{
  if(!process.env[key])
  {
    process.env[key] = secrets[key];
  }
}

//-------------------------------------------------------------------------------

const express      = require('express');
const path         = require('path');
const ejs          = require('ejs');
const cons         = require('consolidate');
const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const url          = require('url');
const session      = require('./build/server/js/controller/sessions.js');

const app = express();
const port = process.env.PORT || 8080;

//-------------------------------------------------------------------------------


// assign the ejs engine to .html files
app.engine('ejs', cons.ejs);

// set .ejs as the default extension
app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/build/server/ejs/');


//-------------------------------------------------------------------------------


// detect if running inside GCP App Engine
if (process.env["GOOGLE_CLOUD_PROJECT"])
{
  app.set('trust proxy', true);

  app.use((req, res, next) => {
    if (!req.secure)
    {
      // Force https
      res.redirect(301, "https://" + req.hostname + req.originalUrl);
    }
    else
    {
      // Set expiration time for this header to 1 day
      res.set("Strict-Transport-Security", `${60 * 60 * 24}; preload`);
      next();
    }
  });
}

//-------------------------------------------------------------------------------

// logging
app.use((req, res, next) => {
  // Only logs request once it has been complete
  var
  client_ip    = req.ip,
  time_started = new Date().toISOString(),
  method       = req.method,
  endpoint     = req.url,
  user_agent   = req.headers['user-agent'];

  res.on('finish', () => {
    console.log("%s | %s -> %s | %s | %s | %s, %s | %s",
                client_ip,
                time_started,
                new Date().toISOString(),
                method,
                endpoint,
                res.statusCode,
                res.statusMessage,
                user_agent);
  });
  next();
});


//-------------------------------------------------------------------------------

// GCP app engine warmup
app.get('/_ah/warmup', (req, res) => {
  // Handle warmup logic. Initiate db connection, etc.
  res.sendStatus(200);
});


//-------------------------------------------------------------------------------

const landing_page = "/html/login.html";

// Default file
app.get('/', (req, res, next) => {
  res.sendFile(landing_page, {root: path.join(__dirname, "build/")});
});

// Don't serve the default file above from the static middleware
app.get(landing_page, (req, res, next) => {
  res.sendStatus(404);
});

// Serves local static assets such as html, css, images, and js files
const static_content = require('./build/server/js/view/static.js');
app.use('/', static_content);

//-------------------------------------------------------------------------------

// For login and signup logic
const auth = require('./build/server/js/view/auth.js');
app.use('/auth', auth);


// Force user to be logged in
app.use(cookieParser(), (req, res, next) => {
  if ('session' in req.cookies)
  {
    session.verify(req.cookies['session'])
      .then(payload => {
        next();
      })
      .catch(err => {
        // Invalid session
        console.error(err);
        res.clearCookie('session');
        res.sendStatus(403);
      });
  }
  else
  {
    // not authorized
    res.sendStatus(403);
  }
});

// Dynamic html content
app.get('/server/ejs/*', (req, res, next) => {
  // sends file to user
  res.render(req.params[0], {site_name: 'DH Contract Tracker'});
});

//-------------------------------------------------------------------------------

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
});


// No route found
app.use((req, res) => {
  res.sendStatus(404);
});

//-------------------------------------------------------------------------------

// keep at the bottom
app.listen(port, () => console.log(`Listening on port ${port}!`));
