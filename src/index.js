var gulp = require('gulp'),
    rename = require("gulp-rename"),
    replace = require('gulp-replace'),
    del = require('del'),
    gutil = require('gulp-util'),
    clean = require('gulp-clean'),
    color = require('gulp-color'),
    elixir = require('laravel-elixir'),
    fs = require("fs"),
    /* Task Yargs Flags Manager */
    argv = require('yargs').argv,
    /* filter index */
    invalidEntries = 0,
    /* Load Config */
    config = require('./Config.js'),
    /* js files array */
    jsFiles = require('./gulpjs.js'),
    /* css files array */
    cssFiles = require('./gulpcss.js'),
    /* gulp bower package manager */
    bowerManager = require('./gulpbower.js'),
    bowerManagerConfig = bowerManager.config;


/**
 *  Files Array
 */
var versionFiles = [];


elixir(function (mix) {
    if (argv.css) {

        compileCSS(mix, cssFiles);

    } else if (argv.js) {

        compilejS(mix, jsFiles);

    } else {

        compileCSS(mix, cssFiles);
        compilejS(mix, jsFiles);
        // Version Assets

    }


    if (argv.production) {
        mix.version(versionFiles);
    }

    //console.log(versionFiles);
});

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
            this[obj.type](obj.filesIn, obj.fileOut);
        } else {
            this[obj.type](obj.filesIn);
        }
        if (typeof(obj.version) != 'undefined') {
            versionFiles.push(obj.version);
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
    var tasks = bowerManager.tasks;
    tasks.forEach(applyGulpBowerManager, gulp);
});


/**
 *  Apply Mix On files css/js
 * @param obj
 * @param index
 * @param array
 */
function applyGulpBowerManager(obj, index, array) {
    // if it has files array
    if (typeof(obj.package) != 'undefined') {

        console.log(color("Package Name: " + obj.package, 'WHITE'));

        obj.files.filter(applyGulpBowerManager, this);

    } else {

        if (typeof(obj.copy) == 'undefined') {
            return false;
        }

        if (!existsSync(bowerManagerConfig.bowerDir + filterPath(obj.copy.from))) {
            console.log(color("File Not Exists: " + obj.copy.from + " | " + obj.copy.to, 'RED'));
            return false;
        }

        this.src(bowerManagerConfig.bowerDir + obj.copy.from)
            .pipe(typeof(obj.copy.replace) != 'undefined' ? replace(obj.copy.replace.find, obj.copy.replace.with) : gutil.noop())
            .pipe(typeof(obj.copy.rename) != 'undefined' ? rename(obj.copy.rename) : gutil.noop())
            .pipe(this.dest(obj.copy.to));

        var logName = "Copy";
        if (typeof(obj.copy.replace) != 'undefined') {
            logName += "/Replace";
        }
        if (typeof(obj.copy.rename) != 'undefined') {
            logName += "/Rename";
        }

        console.log(color(logName + ": " + obj.copy.from + " | " + obj.copy.to, 'GREEN'));

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
    var help = require('./gulphelp.js');
    help.show();
});


/**
 * gulp clean files
 */
gulp.task("clean", function () {
    if (argv.version) {
        cleanBuildFolder();
    } else if (argv.build) {
        cleanPublicFolder();
    } else {
        cleanPublicFolder();
        cleanBuildFolder();
    }
});


function cleanBuildFolder() {
    var manifest = JSON.parse(fs.readFileSync('public/build/rev-manifest.json', 'utf8'), function (normaFile, versionfile) {
        if (typeof(versionfile) == 'string') {
            del(["public/build/" + versionfile, "public/build/" + versionfile + ".map", "public/build/" + normaFile + ".map"]);
            console.log(color("Delete: ", "GREEN") + "public/build/" + versionfile);
        }
    });
    del(['public/build/rev-manifest.json']);
    console.log(color("Delete: ", "GREEN") + "public/build/rev-manifest.json" + versionfile);
}

function cleanPublicFolder() {

    // clean css
    del(["public/css/*.css", "public/css/*.map", "'!public/css/.gitignore'"]);
    console.log(color("Clean: ", "GREEN") + "public/build/css/");

    // clean js
    del(["public/js/*.js", "public/js/*.map", "public/js/*/**", "'!public/js/.gitignore'"]);
    console.log(color("Clean: ", "GREEN") + "public/build/js/");

    if (argv.all) {
        // clean fonts
        del(["public/fonts/**", "'!public/fonts/.gitignore'"]);
        console.log(color("Clean: ", "GREEN") + "public/fonts/");
    }

}









