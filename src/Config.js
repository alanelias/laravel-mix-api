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

var PROJECT_DIR = process.cwd();

var package_config = {
    path: {
        project: PROJECT_DIR,
        custom: []
    },
    files: {
        config: "alixir.json",
        styles: "styles.json",
        script: "styles.json",
        assets: "assets.json"
    }
};

var override_package_config = null;

try {
    var override_package_config = require(package_config.path.project + package_config.files.config);
}catch (err){
    // do nothing
}

console.log(MergeRecursive(package_config, override_package_config));

/**
 *
 * @type {{path: {project: string, custom: *[]}, files: {config: string, styles: string, script: string, assets: string}}}
 */
module.exports = package_config;


