

# Alixir Commands


```
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
Gulp Notification:
-> gulp --notify stop( adding --notify stop, disables gulp notifications on all commands
-------------------------------------------------------------------------------------------------------------------------
Config:
-> gulp config  view alixir config json file.
```

[Back to main README](README.md)
