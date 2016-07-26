var color = require('gulp-color');

/**
 *  it log out all gulp help guides
 * @type {{show: module.exports.show}}
 */
module.exports = {
    show: function () {

        var highlightColor = "GREEN";
        var divider = "-------------------------------------------------------------------------------------------------------------------------";
        var dividerColor = "YELLOW";
        var titleColor = "WHITE";

        // gulp
        console.log(color("Gulp:", titleColor));

        // gulp
        console.log("-> " + color("gulp ", "RED") +
            color("( compile " + color("js and css", highlightColor) + " files " + color("without version and minify", highlightColor) + ", and export them to public folder )", "WHITE"));

        // gulp --template templatename
        console.log("-> " + color("gulp --template templatename ", "RED") +
            color("( compile " + color("js and css", highlightColor) + " files " + color("without version and minify", highlightColor) +
                ", and export them to public folder and " + color("exclude all except templatename", highlightColor) + ")", "WHITE"));

        // gulp  --template templatename --js
        console.log("-> " + color("gulp watch --template templatename --js ", "RED") +
            color("( compile " + color("only js", highlightColor) + " files " + color("without version and minify", highlightColor) +
                ", and export them to public folder and " + color("exclude all except templatename", highlightColor) + " and " +
                color("exclude all css files except js ", highlightColor) + "by using " + color("--js ", highlightColor) + ")", "WHITE"));

        // gulp  --template templatename --css
        console.log("-> " + color("gulp --template templatename --css ", "RED") +
            color("( compile " + color("only css", highlightColor) + " files " + color("without version and minify", highlightColor) +
                ", and export them to public folder and " + color("exclude all except templatename", highlightColor) + " and " +
                color("exclude all css files except js ", highlightColor) + "by using " + color("--css ", highlightColor) + ")", "WHITE"));

        // gulp  --images
        console.log("-> " + color("gulp --images ", "RED") +
            color("( compile " + color("js, css and images", highlightColor) + " files " + color("without version and minify", highlightColor) +
                ", and export them to public folder , by using " + color("--images", highlightColor) + " adds images task to gulp", "WHITE"));

        // divider
        console.log(color(divider, dividerColor));

        // gulp watch
        console.log(color("Gulp Watch:", titleColor));

        // gulp watch
        console.log("-> " + color("gulp watch ", "RED") +
            color("( watch and compile " + color("js and css", highlightColor) + " files " + color("without version and minify", highlightColor) +
                ", and export them to public folder )", "WHITE"));

        // gulp watch --template templatename
        console.log("-> " + color("gulp watch --template templatename ", "RED") +
            color("( watch and compile " + color("js and css", highlightColor) + " files " + color("without version and minify", highlightColor) +
                ", and export them to public folder and " + color("exclude all except templatename", highlightColor) + ")", "WHITE"));

        // gulp watch --template templatename --js
        console.log("-> " + color("gulp watch --template templatename --js ", "RED") +
            color("( watch and compile " + color("only js", highlightColor) + " files " + color("without version and minify", highlightColor) +
                ", and export them to public folder and " + color("exclude all except templatename", highlightColor) + " and " +
                color("exclude all css files except js ", highlightColor) + "by using " + color("--js ", highlightColor) + ")", "WHITE"));

        // gulp watch --template templatename --css
        console.log("-> " + color("gulp watch --template templatename --css ", "RED") +
            color("( watch and compile " + color("only css", highlightColor) + " files " + color("without version and minify", highlightColor) +
                ", and export them to public folder and " + color("exclude all except templatename", highlightColor) + " and " +
                color("exclude all css files except js ", highlightColor) + "by using " + color("--css ", highlightColor) + ")", "WHITE"));

        // gulp  --images
        console.log("-> " + color("gulp watch --images ", "RED") +
            color("( watch and compile " + color("js, css and images", highlightColor) + " files " + color("without version and minify", highlightColor) +
                ", and export them to public folder , by using " + color("--images", highlightColor) + " adds images task to gulp", "WHITE"));

        // divider
        console.log(color(divider, dividerColor));

        // gulp production
        console.log(color("Gulp Production:", titleColor));

        // gulp --production
        console.log("-> " + color("gulp --production ", "RED") +
            color("( compile " + color("js and css", highlightColor) + " files " + color("with version and minify", highlightColor) +
                ", and export them to public folder and into " + color("public/build/ with rev-manifest.json ", highlightColor) + ")", "WHITE"));

        // gulp --production --css
        console.log("-> " + color("gulp --production --css ", "RED") +
            color("( compile " + color("only css", highlightColor) + " files " + color("with version and minify", highlightColor) +
                ", and export them to public folder and into " + color("public/build/ with rev-manifest.json ", highlightColor) + ")", "WHITE"));

        // gulp --production --js
        console.log("-> " + color("gulp --production --js ", "RED") +
            color("( compile " + color("only js", highlightColor) + " files " + color("with version and minify", highlightColor) +
                ", and export them to public folder and into " + color("public/build/ with rev-manifest.json ", highlightColor) + ")", "WHITE"));

        // divider
        console.log(color(divider, dividerColor));

        // gulp list
        console.log(color("Gulp List:", titleColor));

        // gulp list --templates
        console.log("-> " + color("gulp list --templates ", "RED") +
            color("( list of all " + color("templates", highlightColor) + " names with" + color(" command usage", highlightColor) + " )", "WHITE"));

        // gulp list --version
        console.log("-> " + color("gulp list --version ", "RED") +
            color("( list of all " + color("templates", highlightColor) + " names with" + color(" version files", highlightColor) + " )" , "WHITE"));

        // divider
        console.log(color(divider, dividerColor));

        // gulp list
        console.log(color("Gulp Clean:", titleColor));

        // gulp clean
        console.log("-> " + color("gulp clean ", "RED") +
            color("( clean all " + color("public/ files ", highlightColor) + "css/js" + color(" with public/build files and rev-manifest.json", highlightColor)  + " )", "WHITE"));

        // gulp clean --build
        console.log("-> " + color("gulp clean --build ", "RED") +
            color("( clean all " + color("public/build version files ", highlightColor) + "and" + color(" rev-manifest.json", highlightColor)  + " )", "WHITE"));

        // gulp clean --public
        console.log("-> " + color("gulp clean --public ", "RED") +
            color("( clean all " + color("public/ files", highlightColor) + " css/js " + color("without public/build", highlightColor) + " )" , "WHITE"));

        // gulp clean --all
        console.log("-> " + color("gulp clean --all ", "RED") +
            color("( clean all " + color("public/ files", highlightColor) + " css/js/fonts " + color("with public/build files and rev-manifest.json", highlightColor)  + " )", "WHITE"));

        // divider
        console.log(color(divider, dividerColor));

        // gulp Assets
        console.log(color("Gulp Assets:", titleColor));

        // gulp assets
        console.log("-> " + color("gulp assets ", "RED") +
            color("( runs " + color("gulpbower.js tasks", highlightColor) + ", copying " + color("fonts, images, search-replace", highlightColor) + " on required files from "  + color("bower packages folder to public folder", highlightColor) + " )", "WHITE"));

        // divider
        console.log(color(divider, dividerColor));

        // Elixir Notify
        console.log(color("Gulp Notification:", titleColor));

        // gulp notify
        console.log("-> " + color("gulp --notify stop", "RED") +
            color("( adding " + color("--notify stop", highlightColor) +
                ", disables gulp notifications" +
                " on all commands", "WHITE"));

        // divider
        console.log(color(divider, dividerColor));

        // gulp config
        console.log(color("Config:", titleColor));

        // gulp config
        console.log("-> " + color("gulp config ", "RED") +
            color(" view alixir config json file.", "WHITE"));


    }
};