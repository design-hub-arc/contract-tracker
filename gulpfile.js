const { series }    = require('gulp');
const { parallel }  = require('gulp');


exports.default;

// Build documentation
exports.build_docs;

// Deploy to development servers
exports.deploy_dev;

// Deploy to production servers
exports.deploy_prod;

// Deploy locally with docker in development mode
exports.deploy_local_dev;

// Deploy locally with docker in production mode
exports.deploy_local_prod;


// Stylesheets
exports.build_stylesheet = require('./tasks/client/stylesheets.js');

// Markup
//// Client
exports.build_client_markup = require('./tasks/client/markup.js');
//// Server
exports.build_server_markup;


// Scripts
//// Client
exports.build_client_scripts;
//// Server
exports.build_server_scripts;

// Static
exports.build_static;

// Cleanup mess
exports.clean_all;
