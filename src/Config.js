/**
 *
 * @type {{show: module.exports.show}}
 */

var fs = require("fs");

var package_config = {
    path: {
        project: "../../../",
        custom: [{
            path: "../../../bower",
            rgx: "%bower%"
        },{
            path: "../../../bower",
            rgx: "%bower%"
        }]
    },
    files: {
        config: this.path.project + "alixir.json",
        styles: "styles.json",
        script: "styles.json",
        assets: "assets.json"
    }
};

if(existsSync(package_config.files.config)){
    console.log("config there");
}else {
    console.log("no config there");
}


module.exports = package_config;

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