

# Alixir Commands

##gulp:
Compile js and css files without version and minify, and export them to public folder
```
gulp
```

Compile js and css files without version and minify, and export them to public folder and exclude all except templatename
```
gulp --template templatename
```

Compile only js files without version and minify, and export them to public folder and exclude all except templatename and exclude all css files except js by using --js
```
gulp watch --template templatename --js
```

Compile only css files without version and minify, and export them to public folder and exclude all except templatename and exclude all css files except css by using --css 
```
gulp --template templatename --css
```

Compile js, css and images files without version and minify, and export them to public folder , by using --images adds images task to gulp 
```
gulp --images
```

##gulp watch:


Watch and compile js and css files without version and minify, and export them to public folder 
```
gulp watch
```

Watch and compile js and css files without version and minify, and export them to public folder and exclude all except templatename 
```
gulp watch --template templatename
```

Watch and compile only js files without version and minify, and export them to public folder and exclude all except templatename and exclude all css files except js by using --js 
```
gulp watch --template templatename --js
```

Watch and compile only css files without version and minify, and export them to public folder and exclude all except templatename and exclude all css files except js by using --css 
```
gulp watch --template templatename --css
```

Watch and compile js, css and images files without version and minify, and export them to public folder , by using --images adds images task to gulp 
```
gulp watch --images
```

##gulp production:


Compile js and css files with version and minify, and export them to public folder and into public/build/ with rev-manifest.json
```
gulp --production
```

Compile only css files with version and minify, and export them to public folder and into public/build/ with rev-manifest.json 
```
gulp --production --css
```

Compile only js files with version and minify, and export them to public folder and into public/build/ with rev-manifest.json
```
gulp --production --js
```


##gulp list:
List of all templates names with usage command 
```
gulp list --templates
```

List of all templates names with version files
```
list --version
```

##gulp clean:
Clean all dist/ files css/js with build/ files and rev-manifest.json
```
gulp clean
```

Clean all build version files and rev-manifest.json
```
gulp clean --build
```

Clean all dist files css/js without build
```
gulp clean --dist
```

Clean all dist files css/js/fonts/images with build files including rev-manifest.json
```
gulp clean --all
```

##gulp assets:
Runs gulpbower.js tasks, copying fonts, images, search-replace on required files from bower packages folder to public folder
```
gulp assets
```

##notifications:
Adding --notify stop, disables gulp notifications on all commands
```
gulp --notify stop
```

##config:
View alixir config json file.
```
gulp config
```

[Go Back](README.md)
