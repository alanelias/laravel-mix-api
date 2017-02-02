

# Api Commands

## Compile:
***`npm run dev -- api`***
Compiles js and css files without version and minify, and export them to public folder

***`npm run dev -- api="templates:template1,template2"`***
compiles js and css files without version and minify, and export them to public folder and exclude all except template1 and template2

***`npm run dev -- api="templates:template1&js"`***
compiles only js files without version and minify, and export them to public folder and exclude all except template1 and exclude all css files except js by using api="js"

***`npm run dev -- api="templates:template1&css"`***
compiles only css files without version and minify, and export them to public folder and exclude all except template1 and exclude all css files except js by using api="css"

## Watch:

***`npm run watch -- api`***
watchs and compiles js and css files without version and minify, and export them to public folder

***`npm run watch -- api="templates:template1,template2"`***
watchs and compiles js and css files without version and minify, and export them to public folder and exclude all except template1 and template2

***`npm run watch -- api="templates:template1&js"`***
watchs and compiles only js files without version and minify, and export them to public folder and exclude all except template1 and exclude all css files except js by using api="js"

***`npm run watch -- api="templates:template1&css"`***
watchs and compiles only css files without version and minify, and export them to public folder and exclude all except template1 and exclude all css files except js by using api="css"


### Production:

***`npm run production -- api`***
compiles js and css files with version and minify, and export them to public folder

***`npm run production -- api="css"`***
compile only css files with version and minify, and export them to public folder

***`npm run production -- api="js"`***
compile only js files with version and minify, and export them to public folder

### List/Display:

***`npm run production -- api="list:templates"`***
list of all templates names with command usage

***`npm run production -- api="list:templates&css"`***
list of only styles templates names with command usage you can use js as well

### Clean:

***`npm run dev -- api="clean"`***
clean all css, js, fonts, images files  in the public folder with build/ files

***`npm run dev -- api="clean:css,js"`***
clean all css, js files only in the public folder you can use css,js,fonts,images,build


### Assets:

***`npm run dev -- api="assets"`***
runs assets.json tasks, copying fonts, images, search-replace on required files from bower packages folder to public folder

***`npm run dev -- api="assets:images,fonts"`***
runs assets.json tasks, copying fonts, images only these are tags attribute on each task tag: 'images'

### Notification:

***`npm run dev -- api="notify:off"`***
Adding notify:off, disables webpack notifications on all commands

### Config:
***`npm run dev -- api="config"`***
Views api config json file.

### Usage e.g:

***`npm run dev -- api="notify:off&clean:js&assets:images,fonts&js&compile"`***
api="clean&assets&compile" compile means fource compile after assets and clean tasks


***`npm run dev -- api="templates:admin,dashboard&clean:js&assets:images,fonts&compile"`***
***`npm run watch -- api="templates:admin,dashboard"`***
***`npm run production -- api="clean&assets"`***

[Go Back](../README.md)
