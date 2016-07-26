# Alixir
Alixir is an easy cleaning solution to CSS / JS mess. Giving you a nice clean structure for organizing all your sites assets whether it is images, javascript files, or stylesheets and keeps the power of SASS, Browserify, versioning at your fingertips in simple commands you might already be familiar with.

### How to install? ###
**npm** 
```
npm install alixir --save
```

### Override Bower Dir ###
**File:** `.bowerrc`
```
#!json
{
  "directory": "vendor/bower_dl"
}
```

### Install Packages With Bower ###
```
#!bash
bower install pakage-name --save
```

### Gulp Assets ###
Add tasks to `gulp assets` to copy fonts, images and search-replace for hard coded css 
 
**File:** `gulpbower.js`
```
#!javascript
/**
 *  Documentation
 *
 *  tasks: [
 *      {
 *          package: "package-name", // template name use to describe the package object
 *          files: [
 *              {
 *                  copy: {
 *                      from: "package-name/dist/images/**", // copy all (/**) images from the package folder witch is vendor/bower_dl/package-name/dist/images/**
 *                      to: "public/img/package-name" // copy all images to public/img/package-name
 *                  },
 *                  copy: {  // copy and do search and replace and rename at the same time
 *                      from: "package-name/src/css/styles.css", // copy css from vendor/bower_dl/package-name/src/css/styles.css
*
 *                      // you can always visit https://www.npmjs.com/package/gulp-replace for more information about regex
 *                      // regex e.g: { find: /foo(.{3})/g, with: '$1foo' }
 *                      replace: {
 *                          find: 'images/', // find in the document
 *                          with: '/img/package-name/' // and replace it with
 *                      },
*
 *                       // you can always visit https://github.com/hparra/gulp-rename for more information about renaming
 *                      // regex e.g: rename:{ dirname: "main/text/ciao", basename: "aloha", prefix: "bonjour-", suffix: "-hola", extname: ".md" }
 *                      // output: some-where/bonjour-aloha-hola.md
 *                      rename: {
 *                          extname: ".scss" // change file extinstion to scss
 *                      },
 *                      to: "vendor/bower_dl/package-name/src/sass/" // save file into this path
 *                  }
 *              }
 *          ]
 *      },
 *     {
 *          package: "Bootstrap", // copying bootstap fonts e.g
 *          files: [
 *              {
 *                  copy: {
 *                      from: "bootstrap-sass/assets/fonts/bootstrap/**", // copy all files from vendor/bower_dl/bootstrap-sass/assets/fonts/bootstrap/**
 *                      to: "public/fonts/bootstrap" // to this folder
 *                  }
 *              }
 *          ]
 *      }
 *  ]
 */

```

### Add css and sass files to gulp tasks ###
**File:** `gulpcss.js`

```
#!javascript
/**
 *  Documentation
 * [
 *    {
 *         template: "app", // template name use to filter gulp when you run gulp --template app
 *         required: true, // add this if you want all files under this name to be compiled every time
 *         files: [{
 *             type: "sass", // type will apply mix function call e.g: mix.sass(....);
 *             filesIn: "app.scss", // filesIn will be the first args for mix function (string/array of strings) e.g: mix.sass(filesIn, ...);
 *             fileOut: "puplic/css/app.css", // the output file if not define that means by default it will be there we use this in case we need to change the file name or we have multi files in
 *             version: "css/app.css" // version will be the version file when mix.version([.....]) called
 *         }, {
 *             type: "....", // another file to compile
 *             filesIn: ["....", "....."], // binding many files together
 *             fileOut: "puplic/css/all.css" // the output file of binding both files above
 *         }]
 *     },
 * ]
 */
```


### Add js files to gulp tasks ###
**File:** `gulpjs.js`

```
#!javascript

/**
 *  Documentation
 * [
 *     {
 *         template: "app", // template name use to filter gulp when you run gulp --template app
 *         required: true, // add this if you want all files under this name to be compiled every time
 *         files: [ {
 *             type: "scripts", // type will apply mix function call e.g: mix.scripts(....);
 *             filesIn: [ "js/file1.js", bowerPath ("package-name/js/file2.js") , bowerPath ("js/file3.js") ],  // filesIn will be the first args for mix function (string/array of strings) e.g: mix.scripts(filesIn, ...);
 *
 *                // "js/file1.js" it means resources/assets/js/file1.js  (resources/assets/ default folder)
 *                // bowerPath ("js/file2.js") it means vendor/bower_dl/package-name/js/file1.js  (resources/assets/ default folder)
 *
 *             fileOut: "public/js/app.js", // the output file of binding the 3 files above
 *             version: "js/app.js" // version will be the version file when mix.version([.....]) called
 *         }]
 *     }
 * ]
 */
```

### Gulp Manual ###
`gulp help` command
```
#!text
Gulp:
-> gulp ( compile js and css files without version and minify, and export them to public folder )
-> gulp --template templatename ( compile js and css files without version and minify, and export them to public folder and exclude all except templatename)
-> gulp watch --template templatename --js ( compile only js files without version and minify, and export them to public folder and exclude all except templatename and exclude all css files except js by using --js )
-> gulp --template templatename --css ( compile only css files without version and minify, and export them to public folder and exclude all except templatename and exclude all css files except js by using --css )
-> gulp --images ( compile js, css and images files without version and minify, and export them to public folder , by using --images adds images task to gulp
-------------------------------------------------------------------------------------------------------------------------
Gulp Watch:
-> gulp watch ( watch and compile js and css files without version and minify, and export them to public folder )
-> gulp watch --template templatename ( watch and compile js and css files without version and minify, and export them to public folder and exclude all except templatename)
-> gulp watch --template templatename --js ( watch and compile only js files without version and minify, and export them to public folder and exclude all except templatename and exclude all css files except js by using --js )
-> gulp watch --template templatename --css ( watch and compile only css files without version and minify, and export them to public folder and exclude all except templatename and exclude all css files except js by using --css )
-> gulp watch --images ( watch and compile js, css and images files without version and minify, and export them to public folder , by using --images adds images task to gulp
-------------------------------------------------------------------------------------------------------------------------
Gulp Production:
-> gulp --production ( compile js and css files with version and minify, and export them to public folder and into public/build/ with rev-manifest.json )
-> gulp --production --css ( compile only css files with version and minify, and export them to public folder and into public/build/ with rev-manifest.json )
-> gulp --production --js ( compile only js files with version and minify, and export them to public folder and into public/build/ with rev-manifest.json )
-------------------------------------------------------------------------------------------------------------------------
Gulp List:
-> gulp list --templates ( list of all templates names with command usage )
-> gulp list --version ( list of all templates names with version files )
-------------------------------------------------------------------------------------------------------------------------
Gulp Clean:
-> gulp clean ( clean all public/ files css/js with public/build files and rev-manifest.json )
-> gulp clean --build ( clean all public/build version files and rev-manifest.json )
-> gulp clean --public ( clean all public/ files css/js without public/build )
-> gulp clean --all ( clean all public/ files css/js/fonts with public/build files and rev-manifest.json )
-------------------------------------------------------------------------------------------------------------------------
Gulp Assets:
-> gulp assets ( runs gulpbower.js tasks, copying fonts, images, search-replace on required files from bower packages folder to public folder )
-------------------------------------------------------------------------------------------------------------------------
Gulp Notify:
-> gulp --notify stop( adding --notify stop, disables gulp notifications on all commands

```
