let color = require('gulp-color'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    chmod = require('gulp-chmod'),
    rename = require("gulp-rename"),
    replace = require('gulp-replace'),
    fs = require("fs"),
    del = require('del');

class MixApi {

    /*
     * Recursively merge properties of two objects
     */
    mergeRecursive(obj1, obj2) {
        for (var p in obj2) {
            try {
                // Property in destination object set; update its value.
                if (obj2[p].constructor == Object) {
                    obj1[p] = this.mergeRecursive(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch (e) {
                // Property in destination object not set; create it and set its value.
                obj1[p] = obj2[p];
            }
        }
        return obj1;
    }

    /**
     * set config
     * @param config
     */
    setConfig(config) {
        this.config.modify(config, this);
    }

    /**
     * load tasks
     * @param config
     */
    loadTasks(config) {
        var taskFiles = this.config.getTaskFiles();
        for (var index in taskFiles) {
            if (!this.tasks[index]) {
                this.tasks[index] = this.loadFile(taskFiles[index]);
            }
        }
    }

    /**
     * set scripts tasks
     * @param tasks
     */
    setScriptsTasks(tasks) {
        this.tasks.scripts = tasks;
    }

    /**
     * append scripts tasks
     * @param tasks
     */
    appendScriptsTasks(tasks) {
        if (this.tasks.scripts == null) {
            this.tasks.scripts = {};
        }
        this.tasks.scripts = this.mergeRecursive(this.tasks.scripts, tasks);
    }

    /**
     * set styles tasks
     * @param tasks
     */
    setStylesTasks(tasks) {
        this.tasks.styles = tasks;
    }

    /**
     * append styles tasks
     * @param tasks
     */
    appendStylesTasks(tasks) {
        if (this.tasks.styles == null) {
            this.tasks.styles = {};
        }
        this.tasks.styles = this.mergeRecursive(this.tasks.styles, tasks);
    }

    /**
     * set assets tasks
     * @param tasks
     */
    setAssetsTasks(tasks) {
        this.tasks.assets = tasks;
    }

    /**
     * append assets tasks
     * @param tasks
     */
    appendAssetsTasks(tasks) {
        if (this.tasks.assets == null) {
            this.tasks.assets = {};
        }
        this.tasks.assets = this.mergeRecursive(this.tasks.assets, tasks);
    }

    /**
     * load task file
     * @param path
     * @returns {{}}
     */
    loadFile(path) {
        var content = {};
        try {
            var content = require(process.cwd() + "/" + path);
        } catch (error) {
            // do nothing
            console.log(color(error, "RED"));
        }
        return content;
    }

    /**
     * compile
     * @returns {boolean}
     */
    compile() {
        var isCSS = this.argv.isArgv(this.flags.CSS),
            isJS = this.argv.isArgv(this.flags.JS);

        if (isCSS) {
            this.compileStyles();
            this.runFakeTesk();
            return true;
        } else if (isJS) {
            this.compileJavaScript();
        } else {
            this.compileStyles();
            this.compileJavaScript();
        }

        if (this.isProduction()) {
            this.mix.version(this.versionFiles);
        }
    }

    /**
     * run fake task
     * @returns {boolean}
     */
    runFakeTesk() {
        var config = this.config.get();
        if (typeof (config.fakeTask) != 'object') {
            return false;
        }
        this.mix.js(config.fakeTask.filesIn, config.fakeTask.fileOut);
    }

    /**
     * To Compile and watch css files
     */
    compileStyles() {
        var files = this.applyFilter(this.tasks.styles);
        files.forEach(this.applyMixOnFiles, this);
    }

    /**
     * Function To Compile and watch js files
     */
    compileJavaScript() {
        var files = this.applyFilter(this.tasks.scripts);
        files.forEach(this.applyMixOnFiles, this);
    }

    /**
     * Apply Mix On files css/js
     */
    applyMixOnFiles(obj, index, array) {

        // if it has files array
        if (typeof(obj.files) != 'undefined') {
            obj.files.filter(this.applyMixOnFiles, this);
        } else if (typeof(obj.filesIn) != 'undefined') {
            if (typeof(obj.fileOut) != 'undefined') {

                this.mix[obj.type](this.applyPathFilter(obj.filesIn), this.applyPathFilter(obj.fileOut));
            } else {
                this.mix[obj.type](this.applyPathFilter(obj.filesIn));
            }
            if (typeof(obj.version) != 'undefined') {
                this.versionFiles.push(this.applyPathFilter(obj.version));
            }
        }
    }


    /**
     * apply path filter on string or array of files
     * @param collection
     * @returns {*}
     */
    applyPathFilter(collection) {

        if (typeof(collection) === "string") {
            return this.applyCustomPath(collection);
        }

        if (Array.isArray(collection)) {
            collection.forEach(this.applyPathFilterOnFilesList, collection);
        }

        return collection;
    }

    /**
     * assets gulp task do all bower packages (fonts/images/search and replace/rename/copy) files
     */
    runAssetsTasks() {
        this.tasks.assets.forEach(this.runAssetsTask, this);
    }

    /**
     * Apply Filter By Template Function on Array
     */
    applyFilter(arrayToDo) {
        this.invalidEntries = 0;
        return arrayToDo.filter(this.filterByTemplate);
    }

    /**
     *
     * @param obj
     * @param index
     * @param array
     * @returns {boolean}
     */
    runAssetsTask(obj, index, array) {
        // if it has files array
        if (typeof(obj.package) != 'undefined') {

            console.log(color("Package Name: " + obj.package, 'WHITE'));

            obj.files.filter(this.runAssetsTask, this);

        } else {

            // assets filter
            if (this.assets) {
                if ((typeof(obj.tag) != 'undefined' && !this.argv.inArgv(this.assets, obj.tag)) ||
                    typeof(obj.tag) == 'undefined') {
                    return false;
                }
            }

            if (typeof(obj.copy) == 'undefined') {
                return false;
            }

            var copyFromPath = this.applyPathFilter(obj.copy.from);

            var copyToPath = this.applyPathFilter(obj.copy.to);

            if (!this.existsSync(this.filterPath(copyFromPath))) {
                console.log(color("File Not Exists: " + copyFromPath + " | " + copyToPath, 'RED'));
                return false;
            }

            var config = this.config.get();

            if (typeof(obj.use) != 'undefined' && obj.use == "webpack") {
                this.mix.copy(
                    copyFromPath,
                    copyToPath,
                    (typeof(obj.copy.flatten) != 'undefined' && obj.copy.flatten == true) ? true : false
                );
            } else {
                gulp.src(copyFromPath)
                    .pipe(typeof(obj.copy.replace) != 'undefined' ? replace(obj.copy.replace.find, obj.copy.replace.with) : gutil.noop())
                    .pipe(typeof(obj.copy.rename) != 'undefined' ? rename(obj.copy.rename) : gutil.noop())
                    .pipe((config.other.chmod !== 'off') ? chmod(config.other.chmod) : gutil.noop())
                    .pipe(gulp.dest(this.applyPathFilter(copyToPath)));
            }

            var logName = "Copy";
            if (typeof(obj.copy.replace) != 'undefined') {
                logName += "/Replace";
            }
            if (typeof(obj.copy.rename) != 'undefined') {
                logName += "/Rename";
            }

            console.log(color(logName + ": " + copyFromPath + " | " + copyToPath, 'GREEN'));

        }

    }

    /**
     * check if file exists
     * @param filename
     * @returns {boolean}
     */
    existsSync(filename) {
        try {
            fs.accessSync(filename);
            return true;
        } catch (ex) {
            return false;
        }
    }

    /**
     * filter path and remove all *
     * @param path
     * @returns {*}
     */
    filterPath(path) {
        var n = path.lastIndexOf('*');
        if (n >= 0) {
            var n = path.lastIndexOf('/');
            return path.substring(0, n);
        }
        return path;
    }

    /**
     * beautify JSON
     * @param content
     */
    beautifyJSON(content, title) {
        if (!title) title = "Object";
        console.log(color(title + ": ", "GREEN") + JSON.stringify(content, null, 4));
    }

    /**
     * is production mode
     * @returns {boolean}
     */
    isProduction() {
        return process.env.NODE_ENV === 'production';
    }

    /**
     * abort
     * @param report
     */
    abort(report) {
        if (report) {
            console.log(report);
        }
        process.exit();
    }

    /**
     * list all css/js files by template name
     * @param obj
     * @param index
     * @param array
     * @returns {boolean}
     */
    listTemplateCommands(obj, index, array) {
        var logNote = "", logColor = this.colors.text;
        if (typeof(obj.template) != 'undefined') {
            console.log(color("Template: " + obj.template + logNote, this.colors.title));
            // --templates
            if (typeof(obj.required) != 'undefined' && obj.required) {
                logColor = this.colors.subText;
                logNote = color(' (its compiled every time you run -- api="templates:name" and not excludable)', this.colors.hint);
            }
            //console.log("-> " + color('npm run dev -- api="templates:' + obj.template + '"' + logNote, this.colors.text));
            console.log("-> " + color('npm run dev -- api="templates:' + obj.template + '"' +  logNote, logColor));
            obj.files.forEach(this.listTemplateCommands, this);
        } else {
            // --version
            if (typeof(obj.version) != 'undefined') {
                console.log("-> " + color("Version: " + obj.version, this.colors.highlight));
            }
        }
    }

    /**
     * list templates commands
     * @param tasks
     */
    listCommands(tasks){
        tasks.forEach(this.listTemplateCommands, this);
    }

    /**
     * clean command
     * @param todo
     * @param config
     */
    clean(todo, config){
        var todel = [];
        if(!todo ||this.argv.inArgv(todo, 'build')) {
            console.log("- " + color("Cleaning version files: " + this.applyPathFilter(config.path.version.build), this.colors.highlight));
            todel.push(this.applyPathFilter(config.path.version.build) + "**");
        }
        if(!todo ||this.argv.inArgv(todo, 'js')) {
            console.log("- " + color("Cleaning scripts files: " + this.applyPathFilter(config.path.dist.scripts), this.colors.highlight));
            todel.push(this.applyPathFilter(config.path.dist.scripts) + "**");
        }
        if(!todo ||this.argv.inArgv(todo, 'css')) {
            console.log("- " + color("Cleaning styles files: " + this.applyPathFilter(config.path.dist.styles), this.colors.highlight));
            todel.push(this.applyPathFilter(config.path.dist.styles) + "**");
        }
        if(!todo || this.argv.inArgv(todo, 'fonts')) {
            console.log("- " + color("Cleaning fonts files: " + this.applyPathFilter(config.path.dist.fonts), this.colors.highlight));
            todel.push(this.applyPathFilter(config.path.dist.fonts) + "**");
        }
        if(!todo || this.argv.inArgv(todo, 'images') || !todo.length) {
            console.log("- " + color("Cleaning images files: " + this.applyPathFilter(config.path.dist.images), this.colors.highlight));
            todel.push(this.applyPathFilter(config.path.dist.images) + "**");
        }
        if(todel.length) {
            del(todel);
        }
    }
}

module.exports = MixApi;