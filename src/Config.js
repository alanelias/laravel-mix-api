var gutil = require('gulp-util'),
    color = require('gulp-color'),
    PROJECT_DIR = process.cwd();

/*
 * Recursively merge properties of two objects
 */
function MergeRecursive(obj1, obj2) {

    for (var p in obj2) {
        try {
            // Property in destination object set; update its value.
            if ( obj2[p].constructor==Object ) {
                obj1[p] = MergeRecursive(obj1[p], obj2[p]);

            } else {
                obj1[p] = obj2[p];

            }

        } catch(e) {
            // Property in destination object not set; create it and set its value.
            obj1[p] = obj2[p];

        }
    }

    return obj1;
}


var package_config = {
    path: {
        project: PROJECT_DIR + "/",
        version: {
            build: "public/build/",
            manifest: "public/build/rev-manifest.json"
        },
        dist: {
            images: "public/images/",
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
        config: "alixir.json",
        styles: "styles.json",
        scripts: "scripts.json",
        assets: "assets.json"
    },
    other: {
        DISABLE_NOTIFIER: false,
        RegExp: null
    },
    filters:{}

};

var override_package_config = {};

try {
    override_package_config = require(package_config.path.project + package_config.files.config);
}catch (err){
    // do nothing
    console.log(color("Note: there is no " + package_config.files.config, "YELLOW"));
}

package_config = MergeRecursive(package_config, override_package_config);

var gunit_config = gutil.env.ALIXIR_CONFIG;
if(typeof (gunit_config) !== "undefined"){
    package_config = MergeRecursive(package_config, gunit_config);
}

package_config.other.RegExp = new RegExp(Object.keys(package_config.filters).join("|"),"gi");


gutil.env.ALIXIR_CONFIG =  package_config;

/**
 *
 * @type {{path: {project: string, custom: *[]}, files: {config: string, styles: string, script: string, assets: string}}}
 */
module.exports = package_config;


