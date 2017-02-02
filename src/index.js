let Config = require('./Config'),
    Argv = require('./Argv'),
    MixApi = require('./MixApi'),
    Help = require('./Help'),
    self = null;

class Api extends MixApi {

    /**
     * constructor of Api class
     * @param mix
     */
    constructor(mix) {
        super();
        this.mix = mix;
        this.colors = {
            highlight: "GREEN",
            hint: "BLUE",
            divider: "YELLOW",
            title: "WHITE",
            subText: "RED",
            text: "WHITE",
        };
        this.config = new Config();
        this.argv = new Argv();
        this.help = new Help(this.colors);
        this.tasks = {
            styles: null,
            scripts: null,
            assets: null
        };
        this.invalidEntries = 0;
        this.versionFiles = [];
        this.templates = null;
        this.assets = null;
        this.flags = {
            TEMPLATES: 'templates',
            CSS: 'css',
            JS: 'js',
            LIST: 'list',
            CLEAN: 'clean',
            ABOUT: 'about',
            ASSETS: 'assets',
            NOTIFY: 'notify',
            HELP: 'help',
            DISPLAY: 'display',
            CONFIG: 'config',
            COMPILE: 'compile'
        }
        self = this;
    }

    /**
     * run
     */
    run() {
        this.loadTasks();

        var config = this.config.get(),
            isContinue = this.argv.isArgv(this.flags.COMPILE);

        var flag = this.argv.getArgValue(this.flags.NOTIFY);
        if (flag && this.argv.inArgv(flag, "off") || config.other.DISABLE_NOTIFIER) {
            this.mix.disableNotifications();
        }

        flag = this.argv.getArgValue(this.flags.TEMPLATES);
        if (flag) {
            this.templates = flag;
        }

        flag = this.argv.getArgValue(this.flags.ASSETS);
        if (flag) {
            this.assets = flag;
        }

        flag = this.argv.isArgv(this.flags.ABOUT);
        if (flag) {
            this.help.about();
            this.abort(null);
        }

        flag = this.argv.isArgv(this.flags.HELP);
        if (flag) {
            this.help.help();
            this.abort(null);
        }

        flag = this.argv.isArgv(this.flags.CONFIG);
        if (flag) {
            this.beautifyJSON(this.config.get(), "Config");
            this.abort(null);
        }

        flag = this.argv.getArgValue(this.flags.DISPLAY);
        if (flag) {
            if (this.help.list(this, flag)) {
                this.abort(null);
            }
        }

        flag = this.argv.getArgValue(this.flags.LIST);
        if (flag) {
            if (this.help.list(this, flag)) {
                this.abort(null);
            }
        }

        flag = this.argv.isArgv(this.flags.CLEAN);
        if (flag) {
            this.clean(
                this.argv.getArgValue(this.flags.CLEAN),
                config
            );
            if (!this.isProduction() && !isContinue) {
                this.runFakeTesk();
                return true;
            }
        }

        flag = this.argv.isArgv(this.flags.ASSETS);
        if (flag) {
            this.runAssetsTasks();
            if (!this.isProduction() && !isContinue) {
                this.runFakeTesk();
                return true;
            }
        }

        this.compile();
    }

    /**
     * Filter By Template
     * @param obj
     * @returns {boolean}
     */
    filterByTemplate(obj) {
        // check if there is any template flag
        // if there is no template flag retrun true that means no filter
        if (!self.templates) {
            return true;
        }
        // filtering
        if ('template' in obj && typeof(obj.template) === 'string' && self.argv.inArgv(self.templates, obj.template)
            || 'required' in obj && typeof(obj.required) === 'boolean' && obj.required == true) {
            // found
            return true;
        } else {
            // not found
            self.invalidEntries++;
            return false;
        }
    }

    /**
     * apply custom path {"%bowerfolder%": "../../bower.."}
     * @param path
     * @returns {*}
     */
    applyCustomPath(path) {
        var config = self.config.get(); // Todo

        if (!config.alias) {
            return path;
        }
        try {
            path = path.replace(config.other.RegExp, function (matched) {
                return config.alias[matched];
            });
        } catch (error) {

        }
        return path;
    }

    /**
     * apply path filter on array of files
     * @param file
     * @param index
     * @param array
     */
    applyPathFilterOnFilesList(file, index, array) {
        this[index] = self.applyCustomPath(file);
    }
}

module.exports = Api;






