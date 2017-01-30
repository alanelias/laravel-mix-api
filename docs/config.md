
## Override Config

**1.** Create **alixir.json** in the project root dir to override alixir config (files, filters and path) 
```js
mixApi.setConfig({
  "path": {
    "version": {
      "build": "public/build/",
      "manifest": "public/mix-manifest.json"
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
  },
  "files": {
    "styles": "resources/assets/styles.json",
    "scripts": "resources/assets/scripts.json",
    "assets": "resources/assets/assets.json"
  },
  "other": {
    "DISABLE_NOTIFIER": false,
    "chmod": "off"
  },
  "filters": {
    "%bower%": "vendor/bower_dl",
    "%node%": "node_modules",
    "%images%": "public/images",
    "%fonts%": "public/fonts"
  }
});
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

**chmod:** if you have problem with permissions when you run `npm run dev -- api="assets"` and you are using already `bower` or other package required some times `sudo` on `mac` you can override chmod settings and run `sudo npm run dev -- api="assets"` without any problem:

By Default: `"chmod": "off"`
```json
// work with both javascript and json
{
  "other": {
    "chmod": 666
  }
}
```

**Related:** https://github.com/sindresorhus/gulp-chmod 

**Elixir Notifications:** some people don't like mix notifications so you can turn it off allways by adding this:

```json
{
  "other": {
    "DISABLE_NOTIFIER": true
  }
}
```

## Switch from json to js

if you like using javascript instead json you can override files names also:
 
```json
{
  "files": {
    "styles": "resources/assets/styles.js",
    "scripts": "resources/assets/scripts.js",
    "assets": "resources/assets/assets.js"
  }
}
```
and then create the files and in each one add this:
```javascript
var tasks = [
    // here is your tasks javascript object instead json
    // {name: "value"} instead {"name": "value"}
    // or you can try both
];
module.exports =  tasks;
```


[Go Back](../README.md)
