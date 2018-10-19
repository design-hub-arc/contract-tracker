const EJS = require('../node_modules/ejs/lib/ejs.js');
const args = process.argv.slice(2);
const compiled_ejs = EJS.renderFile(args[0], {}, {}, function(err, str){
    if (err){
        console.error(err);
    } else console.log(str);
});
