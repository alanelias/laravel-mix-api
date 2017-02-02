class Config {

    /**
     * constructor of Config class
     */
    constructor() {
        this.config = {
            path: {
                version: {
                    manifest: "public/mix-manifest.json",
                    build: "public/build/"
                },
                dist: {
                    images: "public/images",
                    styles: "public/css/",
                    scripts: "public/js/",
                    fonts: "public/fonts/"
                },
                assets: {
                    images: "resources/assets/images/",
                    styles: "resources/assets/sass/",
                    scripts: "resources/assets/js/",
                    fonts: "resources/assets/public/fonts/"
                }
            },
            files: {
                styles: "styles.json",
                scripts: "scripts.json",
                assets: "assets.json"
            },
            other: {
                DISABLE_NOTIFIER: false,
                RegExp: null,
                chmod: "off"
            },
            alias: {},
            fakeTask: {
                filesIn: "node_modules/laravel-mix-api/src/successfully-completed-task.js",
                fileOut: "../node_modules/laravel-mix-api/src/successfully-completed-task.js",
                chmod: 666
            }
        };
    }

    /**
     * modify config
     * @param config
     */
    modify(config, api) {
        this.config = api.mergeRecursive(this.config, config);
        this.config.other.RegExp = new RegExp(Object.keys(this.config.alias).join("|"), "gi");
    }

    /**
     * gets task files
     */
    getTaskFiles() {
        return this.config.files;
    }

    /**
     * get
     * @returns {*}
     */
    get() {
        return this.config;
    }
}

module.exports = Config;
