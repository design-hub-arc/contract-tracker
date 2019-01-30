const { series }    = require('gulp');
const { parallel }  = require('gulp');


const { buildCSS,
        buildSCSS }       = require('./tasks/client/stylesheets.js');
const { copyHTML,
        buildEJS }        = require('./tasks/client/markup.js');
const { copyServerEJS,
        copyServerHTML }  = require('./tasks/server/markup.js');
const { bundleJS }        = require('./tasks/client/scripts.js');
const { copyServerJS }    = require('./tasks/server/scripts.js');
const { copyStatic }      = require('./tasks/static.js');
const { cleanAll }        = require('./tasks/clean.js');


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
exports.build_stylesheets = parallel(buildCSS, buildSCSS);

// Markup
//// Client
exports.build_client_markups = parallel(copyHTML, buildEJS);
//// Server
exports.build_server_markups = parallel(copyServerEJS, copyServerHTML);


// Scripts
//// Client
exports.build_client_scripts = series(bundleJS);
//// Server
exports.build_server_scripts = series(copyServerJS);

// Static
exports.build_static = parallel(copyStatic);

// Cleanup mess
exports.clean_all = parallel(cleanAll);


exports.default = series(exports.clean_all,
                         parallel(
                           exports.build_stylesheets,
                           exports.build_client_markups,
                           exports.build_server_markups,
                           exports.build_client_scripts,
                           exports.build_server_scripts,
                           exports.build_static
                         ));
