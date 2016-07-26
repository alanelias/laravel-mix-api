


# assets.json


```
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

[Back to main README](README.md)
