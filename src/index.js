var gulp = require('gulp'),
    // Task Yargs Flags Manager
    argv = require('yargs').argv,
    gutil = require('gulp-util'),
    /* Load Config */
    config = require('./Config.js');

// disable elixir notification
if ( config.other.DISABLE_NOTIFIER || argv.notify == "stop" ) {
    process.env.DISABLE_NOTIFIER = true;
}

var rename = require("gulp-rename"),
    replace = require('gulp-replace'),
    del = require('del'),
    clean = require('gulp-clean'),
    color = require('gulp-color'),
    elixir = require('laravel-elixir'),
    fs = require("fs"),
    /* filter index */
    invalidEntries = 0,
    /* js files array */
    jsFiles = require('./scripts.js'),
    /* css files array */
    cssFiles = require('./styles.js'),
    /* gulp bower package manager */
    assetsTasks = require('./assets.js');

/**
 *  Files Array
 */
var versionFiles = [];


elixir(function (mix) {
    if (argv.css) {

        // with --css flag
        compileCSS(mix, cssFiles);

    } else if (argv.js) {

        // with --js flag
        compilejS(mix, jsFiles);

    } else {

        // with no flag
        compileCSS(mix, cssFiles);
        compilejS(mix, jsFiles);
    }

    // with --production flag
    if (argv.production) {

        mix.version(versionFiles);
        publishImages(mix);
    }

    // with --images flag
    if (argv.images) {

        publishImages(mix);
    }

    //console.log(versionFiles);
});

/**
 *  Function To publish images to public
 *
 * @param mix
 **/
function publishImages(mix) {
    mix.copy(applyPathFilter(config.path.assets.images+'**'), applyPathFilter(config.path.dist.images));
}

/**
 *  Function To Compile and watch css files
 * @param mix , cssFiles
 **/
function compileCSS(mix, cssFiles) {
    var cssFiles = applyFilter(cssFiles);
    cssFiles.forEach(applyMixOnFiles, mix);
}

/**
 *  Function To Compile and watch js files
 * @param mix, jsFiles
 **/
function compilejS(mix, jsFiles) {
    var jsFiles = applyFilter(jsFiles);
    jsFiles.forEach(applyMixOnFiles, mix);
}

/**
 *  Apply Mix On files css/js
 * @param obj
 * @param index
 * @param array
 */
function applyMixOnFiles(obj, index, array) {
    // if it has files array
    if (typeof(obj.files) != 'undefined') {
        obj.files.filter(applyMixOnFiles, this);
    } else if (typeof(obj.filesIn) != 'undefined') {
        if (typeof(obj.fileOut) != 'undefined') {
            this[obj.type](applyPathFilter(obj.filesIn), applyPathFilter(obj.fileOut));
        } else {
            this[obj.type](applyPathFilter(obj.filesIn));
        }
        if (typeof(obj.version) != 'undefined') {
            versionFiles.push(applyPathFilter(obj.version));
        }
    }
}


/**
 * Apply Filter By Template Function on Array
 * @param arrayToDo
 * @returns {array}
 */
function applyFilter(arrayToDo) {
    invalidEntries = 0;
    return arrayToDo.filter(filterByTemplate);
}

/**
 *  Filter By Template Function
 * @param obj
 * @returns {boolean}
 * */
function filterByTemplate(obj) {
    // check if there is any template flag
    var templateName = argv.template;
    // if there is no template flag retrun true that means no filter
    if (!templateName) {
        return true;
    }
    // filtering
    if ('template' in obj && typeof(obj.template) === 'string' && obj.template == templateName
        || 'required' in obj && typeof(obj.required) === 'boolean' && obj.required == true) {
        // found
        return true;
    } else {
        // not found
        invalidEntries++;
        return false;
    }
}

/**
 * assets gulp task do all bower packages (fonts/images/search and replace/rename/copy) files
 */
gulp.task("assets", function () {
    assetsTasks.forEach(applyGulpassetsTasks, gulp);
});


/**
 *  Apply Mix On files css/js
 * @param obj
 * @param index
 * @param array
 */
function applyGulpassetsTasks(obj, index, array) {
    // if it has files array
    if (typeof(obj.package) != 'undefined') {

        console.log(color("Package Name: " + obj.package, 'WHITE'));

        obj.files.filter(applyGulpassetsTasks, this);

    } else {

        if (typeof(obj.copy) == 'undefined') {
            return false;
        }

        var copy_from_path = applyPathFilter(obj.copy.from);

        var copy_to_path = applyPathFilter(obj.copy.to);

        if (!existsSync(filterPath(copy_from_path))) {
            console.log(color("File Not Exists: " + copy_from_path + " | " + copy_to_path, 'RED'));
            return false;
        }

        this.src(copy_from_path)
            .pipe(typeof(obj.copy.replace) != 'undefined' ? replace(obj.copy.replace.find, obj.copy.replace.with) : gutil.noop())
            .pipe(typeof(obj.copy.rename) != 'undefined' ? rename(obj.copy.rename) : gutil.noop())
            .pipe(this.dest(applyPathFilter(copy_to_path)));

        var logName = "Copy";
        if (typeof(obj.copy.replace) != 'undefined') {
            logName += "/Replace";
        }
        if (typeof(obj.copy.rename) != 'undefined') {
            logName += "/Rename";
        }

        console.log(color(logName + ": " + copy_from_path + " | " + copy_to_path, 'GREEN'));

    }

}

/**
 * filter path and remove all *
 * @param path
 * @returns {*}
 */
function filterPath(path) {
    var n = path.lastIndexOf('*');
    if (n >= 0) {
        var n = path.lastIndexOf('/');
        return path.substring(0, n);
    }
    return path;
}

/**
 * check file exists
 * @param filename
 * @returns {boolean}
 */
function existsSync(filename) {
    try {
        fs.accessSync(filename);
        return true;
    } catch (ex) {
        return false;
    }
}


/**
 * apply path filter on string or array of files
 *
 * @param collection
 * @returns {*}
 */
function applyPathFilter(collection) {

    if (typeof(collection) === "string") {
        return applyCustomPath(collection);
    }

    if (Array.isArray(collection)) {
        collection.forEach(applyPathFilterOnFilesList, collection);
    }

    return collection;
}

/**
 * apply path filter on array of files
 *
 * @param file
 * @param index
 * @param array
 */
function applyPathFilterOnFilesList(file, index, array) {
    this[index] = applyCustomPath(file);
}


/**
 * apply custom path {"%bowerfolder%": "../../bower.."}
 *
 * @param path
 * @returns {*}
 */
function applyCustomPath(path) {
    if (!config.filters) {
        return path;
    }

    try {
        path = path.replace(config.other.RegExp, function (matched) {
            return config.filters[matched];
        });
    } catch (error) {

    }
    return path;

}


/**
 * lists all commands needed
 */
gulp.task("list", function () {

    if (argv.templates || argv.version) {

        // Style Sheets / CSS
        console.log(color("Style Sheets:", "YELLOW"));
        cssFiles.forEach(listTemplateCommands);

        // JavaScript / JS
        console.log(color("JavaScript:", "YELLOW"));
        jsFiles.forEach(listTemplateCommands);

    }

});

/**
 *  list all css/js files by template name
 * @param obj
 * @param index
 * @param array
 */
function listTemplateCommands(obj, index, array) {

    var logColor = "WHITE";
    var logNote = "";
    var versionColor = "GREEN";

    if (typeof(obj.template) != 'undefined') {

        // --version
        if (argv.version) {
            console.log(color("Template: " + obj.template + logNote, logColor));
            obj.files.forEach(listTemplateCommands);
            return false;
        }

        // --templates
        if (typeof(obj.required) != 'undefined' && obj.required) {
            logColor = "RED";
            logNote = color(" (it's compiled every time you run --template name and not excludable)", "BLUE");
        }

        console.log("-> " + color("gulp --template " + obj.template + logNote, logColor));

    } else if (argv.version) {
        // --version
        if (typeof(obj.version) != 'undefined') {
            console.log("-> " + color("Version: " + obj.version, versionColor));
        }
    }


};

/**
 * gulp help
 */
gulp.task("help", function () {
    var help = require('./help.js');
    help.show();
});


/**
 * gulp clean files
 */
gulp.task("clean", function (cb) {
    if(argv.build) {
        cleanBuildFolder(cb);
    }else if(argv.dist){
        cleanPublicFolder(cb);
    }else {
        cleanPublicFolder(cb);
        cleanBuildFolder(cb);
    }
});


function cleanBuildFolder(cb){
    // clean up the build folder
    var build_folder = applyPathFilter(config.path.version.build);
    del([ build_folder + '**' ], cb);
    console.log(color("Clean: ", "GREEN") + build_folder);
}

function cleanPublicFolder(cb) {
    var styles_folder = applyPathFilter(config.path.dist.styles);
    var scripts_folder = applyPathFilter(config.path.dist.scripts);

    // clean dist css
    del([ styles_folder + "**" ], cb);
    console.log(color("Clean: ", "GREEN") + styles_folder);

    // clean dist js
    del([ scripts_folder + "**" ], cb);
    console.log(color("Clean: ", "GREEN") + scripts_folder);

    // with --all flag
    if(argv.all) {

        var fonts_folder = applyPathFilter(config.path.dist.fonts);
        var images_folder = applyPathFilter(config.path.dist.images);

        // clean fonts
        del([ fonts_folder + "**"], cb);
        console.log(color("Clean: ", "GREEN") + fonts_folder);

        // clean images
        del([ images_folder + "**" ], cb);
        console.log(color("Clean: ", "GREEN") + images_folder);
    }

}

/**
 * gulp config
 */
gulp.task("config", function () {
    console.log(color("Config: ", "GREEN") + JSON.stringify(config, null, 4));
});






