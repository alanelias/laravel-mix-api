

# scripts.json

**Note** with `type` you can use all mix calls js ...... etc

```
/**
 *  Documentation
 * [ // here is array of template objects
 *     {
 *         "template": "app", // template name use to filter gulp when you run npm run dev -- api="templates:app"
 *         "required": true, // add this if you want all files under this name to be compiled every time
 *         "files": [ {
 *             "type": "js", // type will apply mix function call e.g: mix.js(....);
 *             "filesIn": [ "js/file1.js", "%<<<bower%/package-name/js/file2.js") , bowerPath ("js/file3.js") ],  // filesIn will be the first args for mix function (string/array of strings) e.g: mix.scripts(filesIn, ...);
 *
 *                // "js/file1.js" it means resources/assets/js/file1.js  (resources/assets/ elixir default folder)
 *                // "%<<<bower%/package-name/js/file2.js" it means ../../../vendor/bower_dl/package-name/js/file1.js 
 *                // by overriding config you can define multiple filters: {"%<<<bower%": "../../../vendor/bower_dl", ........ etc }
 *
 *             "fileOut": "public/js/app.js", // the output file of binding the 3 files above
 *             "version": "js/app.js" // version will be the version file when mix.version([.....]) called
 *         }]
 *     },
 *     { // another template
 *         "template": "something", // template name use to filter gulp when you run npm run dev -- api="templates:something"
 *         "required": true, // add this if you want all files under this name to be compiled every time
 *         "files": [ {
 *             "type": "js", // type will apply mix function call e.g: mix.js(....);
 *             "filesIn": "js/app-something.js",  // filesIn will be the first args for mix function (string/array of strings) e.g: mix.scripts(filesIn, ...);
 *             "fileOut": "public/js/app-something.js", // the output 
 *             "version": "js/app-something.js" // version will be the version file when mix.version([.....]) called
 *         }]
 *     },
 * ]
 */
```

[Click here to see another way to setup tasks](tasks.md)


[Go Back](../README.md)
