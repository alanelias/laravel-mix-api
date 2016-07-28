/**
 *  Documentation
 * [
 *     {
 *         template: "app", // template name use to filter gulp when you run gulp --template app
 *         required: true, // add this if you want all files under this name to be compiled every time
 *         files: [ {
 *             type: "scripts", // type will apply mix function call e.g: mix.scripts(....);
 *             filesIn: [ "js/file1.js", bowerPath ("package-name/js/file2.js") , bowerPath ("js/file3.js") ],  // filesIn will be the first args for mix function (string/array of strings) e.g: mix.scripts(filesIn, ...);
 *
 *                // "js/file1.js" it means resources/assets/js/file1.js  (resources/assets/ default folder)
 *                // bowerPath ("js/file2.js") it means vendor/bower_dl/package-name/js/file1.js  (resources/assets/ default folder)
 *
 *             fileOut: "public/js/app.js", // the output file of binding the 3 files above
 *             version: "js/app.js" // version will be the version file when mix.version([.....]) called
 *         }]
 *     }
 * ]
 */


var gutil = require('gulp-util'),
    color = require('gulp-color'),
    config = gutil.env.ALIXIR_CONFIG;


var tasks = [];

try {
    var tasks = require(config.path.project + config.files.scripts);
}catch (error){
    // do nothing
    console.log(color(error, "RED"));
}

module.exports =  tasks;