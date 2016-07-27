
## override config

**files:** by default they will be in the project root dir but you can override the path e.g "styles": "/resources/styles.json"
```json
"files": {
    "styles": "styles.json",
    "scripts": "scripts.json",
    "assets": "assets.json"
  }
```


**filters:** path filter it allowed you to change the default dir in file path e.g:
"%key%/somewhere/somefile.any"

```json
"filters": {
    "%key%": "value",
    "%key%": "value"
  }
```



[Back to main README](README.md)
