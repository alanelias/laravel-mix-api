
## override config
there are two ways to override config file. 

**1.** Create **alixir.json** in the project root dir to override alixir config (files, filters and path) 
```json
{
  "files": {
    "styles": "styles.json",
    "scripts": "scripts.json",
    "assets": "assets.json"
  },
  "filters": {
    "%bower%": "vendor/bower_dl",
    "%res_bower%": "../../../vendor/bower_dl"
  },
  "path": {
    "version": {
      "build": "public/build/",
      "manifest": "public/build/rev-manifest.json"
    }
  },
  "dist": {
    "images": "public/images/",
    "styles": "public/css/",
    "scripts": "public/js/",
    "fonts": "public/fonts/"
  },
  "assets": {
    "images": "resources/assets/images/",
    "styles": "resources/assets/sass/",
    "scripts": "resources/assets/js/",
    "fonts": "resources/assets/public/fonts/"
  }
}
```

**2.** Install the following package:
```
npm install gulp-util --save
```

then add this to `gulpfile.js`
```javascript
var gutil = require('gulp-util');

gutil.env.ALIXIER_CONFIG = {
    "files": {
        "styles": "resources/assets/styles.json",
        "scripts": "resources/assets/scripts.json",
        "assets": "resources/assets/assets.json"
    },
    "filters": {
        "%bower%": "vendor/bower_dl",
        "%images%": "public/images/",
        "%fonts%": "public/fonts/"
    }
};

require("alixir");
```



**files:** by default they will be in the project root dir but you can override the path e.g "styles": "/resources/styles.json"
```json
{
  "files": {
    "styles": "styles.json",
    "scripts": "scripts.json",
    "assets": "assets.json"
  }
}
```


**filters:** path filter it allowed you to change the default dir in file path e.g:
"%key%/somewhere/somefile.any"

```json
{
  "filters": {
    "%key%": "value",
    "%key%": "value",
    "%images%": "public/images",
    "%fonts%": "public/fonts"
  }
}
```

**Elixir Notifications:** some people don't like elixir notifications so you can turn it off allways by adding this:

```json
{
  "other": {
    "DISABLE_NOTIFIER": true
  }
}
```


[Go Back](README.md)
