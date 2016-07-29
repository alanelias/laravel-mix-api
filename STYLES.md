
# styles.json

**Note** with `type` you can use all mix calls styles, sass, less ...... etc

```
/**
 *  Documentation
 * [ // here is array of template object 
 *    {
 *         "template": "app", // template name use to filter gulp when you run gulp --template app
 *         "required": true, // add this if you want all files under this name to be compiled every time
 *         "files": [{
 *             "type": "sass", // type will apply mix function call e.g: mix.sass(....);
 *             "filesIn": "app.scss", // filesIn will be the first args for mix function call(string, array of strings) e.g: mix.sass(filesIn, ...);  
 *             "fileOut": "puplic/css/app.css", // the output file if not define that means by default it will be there we use this in case we need to change the file name or we have multi files in
 *             "version": "css/app.css" // version will be the version file when mix.version([.....]) called
 *         }, {
 *             "type": "....", // another file to compile
 *             "filesIn": ["....", "....."], // binding many files together
 *             "fileOut": "puplic/css/all.css" // the output file of binding both files above
 *         }]
 *     },
 *    {// another template
 *         "template": "something", // template name use to filter gulp when you run gulp --template somthing
 *         "required": true, // add this if you want all files under this name to be compiled every time
 *         "files": [{
 *             "type": "less", // type will apply mix function call e.g: mix.less(....);
 *             "filesIn": "something.scss", // filesIn will be the first args for mix function (string/array of strings) e.g: mix.less(filesIn, ...);
 *             "fileOut": "puplic/css/somthing.css", // the output file if not define that means by default it will be there we use this in case we need to change the file name or we have multi files in
 *             "version": "css/something.css" // version will be the version file when mix.version([.....]) called
 *         }, {
 *             "type": "....", // another file to compile
 *             "filesIn": ["....", "....."], // binding many files together
 *             "fileOut": "puplic/css/all.css" // the output file of binding both files above
 *         }]
 *     }, 
 * ]
 */
```

[Go Back](README.md)