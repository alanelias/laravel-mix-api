


# assets.json

Some packages doesn't support sass or less so by using assets you can search and replace path string inside js or css file e.g:
move the package images to your project public folder `public/images/package-name/`
and then do search and replace for images path in the css file (find `images/` replace with `/images/package-name/`) and save the file in different dir inside the package folder to be instead `css/` to `sass/` and then `@import "....../package-name/sass/styles.scss";` import to app.scss or any where you want
```json
[
  {
    "package": "Slider Pro",
    "files": [
      {
        "copy": {
          "from": "%bower%/slider-pro/dist/css/slider-pro.css",
          "replace": {
            "find": "images/",
            "with": "/images/slider-pro/"
          },
          "rename": {
            "extname": ".scss"
          },
          "to": "vendor/bower_dl/slider-pro/dist/sass/"
        }
      },
      {
        "copy": {
          "from": "%bower%/slider-pro/dist/css/images/**",
          "to": "public/images/slider-pro/"
        }
      }
    ]
  }
]
```

###Please read below:
```
/**
 *  Documentation
 *
 * [ // here is array of package tasks
 *      { 
 *          "package": "package-name", // template name use to describe the package object
 *          "files": [
 *              {
 *                  "copy": {
 *                      from": "%bower%/package-name/dist/images/**", // copy all (/**) images from the package folder witch is vendor/bower_dl/package-name/dist/images/**
 *                      to": "public/img/package-name" // copy all images to public/img/package-name
 *                  },
 *                  "copy: {  // copy and do search and replace and rename at the same time
 *                      "from": "%bower%/package-name/src/css/styles.css", // copy css from vendor/bower_dl/package-name/src/css/styles.css
 *
 *                      // you can always visit https://www.npmjs.com/package/gulp-replace for more information about regex
 *                      // regex e.g: { "find": /foo(.{3})/g, "with": '$1foo' }
 *                      "replace": {
 *                          "find": 'images/', // find in the document
 *                          "with": '/img/package-name/' // and replace it with
 *                      },
 *
 *                      // you can always visit https://github.com/hparra/gulp-rename for more information about renaming
 *                      // regex e.g: "rename":{ "dirname": "main/text/ciao", "basename": "aloha", "prefix": "bonjour-", "suffix": "-hola", "extname": ".md" }
 *                      // output: some-where/bonjour-aloha-hola.md
 *                      "rename": {
 *                          "extname": ".scss" // change file extinstion to scss
 *                      },
 *                      "to": "vendor/bower_dl/package-name/src/sass/" // save file into this path
 *                  }
 *              }
 *          ]
 *      },
 *     { 
 *          "package": "Bootstrap", // copying bootstrap fonts e.g
 *          "files": [
 *              {
 *                  "copy": {
 *                      "from": "%bower%/bootstrap-sass/assets/fonts/bootstrap/**", // copy all files from vendor/bower_dl/bootstrap-sass/assets/fonts/bootstrap/**
 *                      "to": "public/fonts/bootstrap" // to this folder
 *                  }
 *              }
 *          ]
 *      }
 *  ]
 */
```

[Go Back](README.md)
