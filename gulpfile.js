const { series }    = require('gulp');
const { parallel }  = require('gulp');


exports.default    = parallel();

exports.build_css  = series();
exports.clean_css  = series();

exports.build_scss = series();
exports.clean_scss = series();

exports.build_html = series();
exports.clean_html = series();

exports.build_ejs  = series();
exports.clean_ejs  = series();

exports.build_js   = series();
exports.clean_js   = series();

exports.clean_all  = series();
