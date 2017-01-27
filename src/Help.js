let color = require('gulp-color');

class Help {
    /**
     * constructor of Help class
     * @param colors
     */
    constructor(colors) {
        this.colors = colors;
        this.divider = "-------------------------------------------------------------------------------------------------------------------------";
    }

    /**
     * about
     */
    about() {
        console.log(color("By: Alan Elias", this.colors.highlight));
        console.log(color("Email: alaaelias@gmail.com", this.colors.highlight));
        console.log(color("LinkedIn: http://www.linkedin.com/in/alanwelias", this.colors.highlight));
    }

    /**
     * help
     */
    help() {

        // gulp
        console.log(color("Compile:", this.colors.title));

        // npm run dev
        console.log("-> " + color("npm run dev -- api", this.colors.subText) +
            color("( compiles " + color("js and css", this.colors.highlight) + " files " + color("without version and minify", this.colors.highlight) + ", and export them to public folder )", this.colors.text));

        // npm run dev -- api="templates:template1,template2"
        console.log("-> " + color('npm run dev -- api="templates:template1,template2" ', this.colors.subText) +
            color("( compiles " + color("js and css", this.colors.highlight) + " files " + color("without version and minify", this.colors.highlight) +
                ", and export them to public folder and " + color("exclude all except template1 and template2", this.colors.highlight) + " )", this.colors.text));

        // npm run dev -- api="templates:template1&js"
        console.log("-> " + color('npm run dev -- api="templates:template1&js" ', this.colors.subText) +
            color("( compiles " + color("only js", this.colors.highlight) + " files " + color("without version and minify", this.colors.highlight) +
                ", and export them to public folder and " + color("exclude all except template1", this.colors.highlight) + " and " +
                color("exclude all css files except js ", this.colors.highlight) + "by using " + color('api="js"', this.colors.highlight) + " )", this.colors.text));

        // npm run dev -- api="templates:template1&css"
        console.log("-> " + color('npm run dev -- api="templates:template1&css" ', this.colors.subText) +
            color("( compiles " + color("only css", this.colors.highlight) + " files " + color("without version and minify", this.colors.highlight) +
                ", and export them to public folder and " + color("exclude all except template1", this.colors.highlight) + " and " +
                color("exclude all css files except js ", this.colors.highlight) + "by using " + color('api="css"', this.colors.highlight) + " )", this.colors.text));

        // divider
        console.log(color(this.divider, this.colors.divider));

        // watch
        console.log(color("Watch:", this.colors.title));

        // npm run watch
        console.log("-> " + color('npm run watch -- api', this.colors.subText) +
            color("( watchs and compiles " + color("js and css", this.colors.highlight) + " files " + color("without version and minify", this.colors.highlight) +
                ", and export them to public folder )", this.colors.text));

        // npm run watch -- api="templates:template1,template2"
        console.log("-> " + color('npm run watch -- api="templates:template1,template2" ', this.colors.subText) +
            color("( watchs and compiles " + color("js and css", this.colors.highlight) + " files " + color("without version and minify", this.colors.highlight) +
                ", and export them to public folder and " + color("exclude all except template1 and template2", this.colors.highlight) + " )", this.colors.text));

        // npm run watch -- api="templates:template1&js"
        console.log("-> " + color('npm run watch -- api="templates:template1&js" ', this.colors.subText) +
            color("( watchs and compiles " + color("only js", this.colors.highlight) + " files " + color("without version and minify", this.colors.highlight) +
                ", and export them to public folder and " + color("exclude all except template1", this.colors.highlight) + " and " +
                color("exclude all css files except js ", this.colors.highlight) + "by using " + color('api="js" ', this.colors.highlight) + ")", this.colors.text));

        // npm run watch -- api="templates:template1&css"
        console.log("-> " + color('npm run watch -- api="templates:template1&css" ', this.colors.subText) +
            color("( watchs and compiles " + color("only css", this.colors.highlight) + " files " + color("without version and minify", this.colors.highlight) +
                ", and export them to public folder and " + color("exclude all except template1", this.colors.highlight) + " and " +
                color("exclude all css files except js ", this.colors.highlight) + "by using " + color('api="css" ', this.colors.highlight) + ")", this.colors.text));

        // divider
        console.log(color(this.divider, this.colors.divider));

        // production
        console.log(color("Production:", this.colors.title));

        // npm run production -- api="templates:template1,template2"
        console.log("-> " + color("npm run production -- api", this.colors.subText) +
            color("( compiles " + color("js and css", this.colors.highlight) + " files " + color("with version and minify", this.colors.highlight) +
                ", and export them to public folder )", this.colors.text));

        // npm run production -- api="css"
        console.log("-> " + color('npm run production -- api="css" ', this.colors.subText) +
            color("( compile " + color("only css", this.colors.highlight) + " files " + color("with version and minify", this.colors.highlight) +
                ", and export them to public folder )", this.colors.text));

        // npm run production -- api="js"
        console.log("-> " + color('npm run production -- api="js" ', this.colors.subText) +
            color("( compile " + color("only js", this.colors.highlight) + " files " + color("with version and minify", this.colors.highlight) +
                ", and export them to public folder )", this.colors.text));

        // divider
        console.log(color(this.divider, this.colors.divider));

        // npm run production -- api="list:templates"
        console.log(color("List/Display:", this.colors.title));

        // npm run production -- api="list:templates"
        console.log("-> " + color('npm run production -- api="list:templates" ', this.colors.subText) +
            color("( list of all " + color("templates", this.colors.highlight) + " names with" + color(" command usage", this.colors.highlight) + " )", this.colors.text));

        // npm run production -- api="list:templates&css"
        console.log("-> " + color('npm run production -- api="list:templates&css" ', this.colors.subText) +
            color("( list of only styles " + color("templates", this.colors.highlight) + " names with" + color(" command usage", this.colors.highlight) + " ) you can use js as well", this.colors.text));

        // divider
        console.log(color(this.divider, this.colors.divider));

        // Clean
        console.log(color("Clean:", this.colors.title));

        // npm run dev -- api="clean"
        console.log("-> " + color('npm run dev -- api="clean" ', this.colors.subText) +
            color("( clean all " + color("css, js, fonts, images files ", this.colors.highlight) + " in the public folder" + color(" with build/ files ", this.colors.highlight) + " )", this.colors.text));

        // npm run dev -- api="clean:css,js"
        console.log("-> " + color('npm run dev -- api="clean:css,js" ', this.colors.subText) +
            color("( clean all " + color("css, js files only", this.colors.highlight) + " in the public folder" + color(" you can use css,js,fonts,images,build ", this.colors.highlight) + " )", this.colors.text));

        // divider
        console.log(color(this.divider, this.colors.divider));

        // Assets
        console.log(color("Assets:", this.colors.title));

        // npm run dev -- api="assets"
        console.log("-> " + color('npm run dev -- api="assets" ', this.colors.subText) +
            color("( runs " + color("assets.json tasks", this.colors.highlight) + ", copying " + color("fonts, images, search-replace", this.colors.highlight) + " on required files from " + color("bower packages folder to public folder", this.colors.highlight) + " )", this.colors.text));

        // npm run dev -- api="assets:images,fonts"
        console.log("-> " + color('npm run dev -- api="assets:images,fonts" ', this.colors.subText) +
            color("( runs " + color("assets.json tasks", this.colors.highlight) + ", copying " + color("fonts, images", this.colors.highlight) + " only " + color("these are tags attribute on each task tag: 'images'", this.colors.highlight) + " )", this.colors.text));

        // divider
        console.log(color(this.divider, this.colors.divider));

        // Notification
        console.log(color("Notification:", this.colors.title));

        // npm run dev -- api="notify:off"
        console.log("-> " + color('npm run dev -- api="notify:off" ', this.colors.subText) +
            color("( adding " + color("notify:off", this.colors.highlight) +
                ", disables webpack notifications" +
                " on all commands", this.colors.text));

        // divider
        console.log(color(this.divider, this.colors.divider));

        // config
        console.log(color("Config:", this.colors.title));

        // npm run dev -- api="config"
        console.log("-> " + color('npm run dev -- api="config" ', this.colors.subText) +
            color(" view api config json file.", this.colors.text));

        // divider
        console.log(color(this.divider, this.colors.divider));

        // config
        console.log(color("Usage e.g:", this.colors.title));

        // e.g
        console.log("-> " + color('npm run dev -- api="notify:off&clean:js&assets:images,fonts&js&compile" ' + color('api="clean&assets&compile" compile means fource compile after assets and clean tasks', this.colors.title), this.colors.subText));

        console.log("-> " + color('npm run dev -- api="templates:admin,dashboard&clean:js&assets:images,fonts&compile" ', this.colors.subText));

        console.log("-> " + color('npm run watch -- api="templates:admin,dashboard" ', this.colors.subText));

        console.log("-> " + color('npm run production -- api="clean&assets" ', this.colors.subText));
    }

    /**
     * list command
     * @param api
     * @param flagValue
     * @returns {boolean}
     */
    list(api, flagValue) {
        if (api.argv.inArgv(flagValue, "templates")) {
            var isCSS = api.argv.isArgv(api.flags.CSS),
                isJS = api.argv.isArgv(api.flags.JS);

            if (isCSS) {
                this.listStylesTemplates(api);
            } else if (isJS) {
                this.listScriptsTemplates(api);
            } else {
                this.listStylesTemplates(api);
                console.log(color(this.divider, this.colors.divider));
                this.listScriptsTemplates(api);
            }
        }
        return true;
    }

    /**
     * list all styles templates
     * @param api
     */
    listStylesTemplates(api) {
        // Style Sheets / CSS
        console.log(color("Style Sheets:", this.colors.divider));
        api.listCommands(api.tasks.styles);
    }

    /**
     * list all styles templates
     * @param api
     */
    listScriptsTemplates(api) {
        // JavaScript / JS
        console.log(color("JavaScript:", this.colors.divider));
        api.listCommands(api.tasks.scripts);
    }


}

module.exports = Help;