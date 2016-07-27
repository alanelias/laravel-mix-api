# Alixir | elixir-helper | laravel-elixir-helper
Alixir is `npm package` built on top of elixer and gulp, its an easy cleaning solution to CSS / JS mess. Giving you a nice clean structure for organizing all your sites assets whether it is images, javascript files, or stylesheets and keeps the power of SASS, Browserify, versioning at your fingertips in simple commands you might already be familiar with.
**The advantage of this package is breaking down all your project assets files as templates by filtering gulp and dealing with json files without editing gulp** 

## You can use this:
```
gulp watch --template customer-service --js
```
or
```
gulp watch --template customer-service --css
```


## Installation ##
**npm**  
```
npm install alixir --save-dev

npm install gulp@">=0.1.0 <=3.9.1" --save-dev

npm install laravel-elixir@">=0.1.0 <=5.0.0" --save-dev
```



## Usage
**gulpfile.js** 
```
require('alixir');
```

Create **alixir.json** in the project root dir to override alixir config (files, filters and path) [see documentaion](ALIXIR.md) 
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
}
```

Create **styles.json**  [see documentaion](STYLES.md)
```json
[
  {
    "template": "app",
    "required": true,
    "files": [
      {
        "type": "sass",
        "filesIn": "app.scss",
        "version": "css/app.css"
      }
    ]
  },
  {
    "template": "home",
    "files": [
      {
        "type": "sass",
        "filesIn": "pages/app-home.scss",
        "version": "css/app-home.css"
      }
    ]
  }
]
```

Create **scripts.json**  [see documentaion](SCRIPTS.md)
```json
[
  {
    "template": "app",
    "files": [
      {
        "type": "scripts",
        "filesIn": [
          "common/variables.js",
          "%res_bower%/jquery/dist/jquery.js",
          "%res_bower%/jquery-ui/index.js",
          "%res_bower%/bootstrap-sass/assets/javascripts/bootstrap.js",
          "%res_bower%/vue/dist/vue.js",
          "app.js"
        ],
        "fileOut": "public/js/app.js",
        "version": "js/app.js"
      }
    ]
  },
  {
    "template": "home",
    "files": [
      {
        "type": "browserify",
        "filesIn": [
          "components/somelib.js",
          "%res_bower%/package1/dist/js/script.js",
          "%res_bower%/package2/source/main.js",
          "pages/app-home.js"
        ],
        "fileOut": "public/js/app-home.js",
        "version": "js/app-home.js"
      }
    ]
  }
]
```

Create **assets.json** [see documentaion](ASSETS.md)
```json
[
  {
    "package": "Bootstrap",
    "files": [
      {
        "copy": {
          "from": "%bower%/bootstrap-sass/assets/fonts/bootstrap/**",
          "to": "public/fonts/bootstrap"
        }
      }
    ]
  },
  {
    "package": "Font Awesome",
    "files": [
      {
        "copy": {
          "from": "%bower%/font-awesome/fonts/**",
          "to": "public/fonts/font-awesome"
        }
      }
    ]
  },
  {
    "package": "Toster",
    "files": [
      {
        "copy": {
          "from": "%bower%/toastr/toastr.css",
          "rename": {
            "extname": ".scss"
          },
          "to": "vendor/bower_dl/toastr/sass/"
        }
      }
    ]
  },
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

# Break down laravel assets
[see documentaion](LARAVEL.md)
Main project css file witch is `app.css`
```blade
<link href="{!!  \App\Helpers\AssetsHelper::elixir('css/app.css')  !!}" rel="stylesheet" />
```

To get `first or second route` css file your-website.com/`%first-route%`/*
```blade
{!! \App\Helpers\AssetsHelper::pageStyle() !!}
```

To create page css `class` in each page
```blade
<body class="{{ \App\Helpers\AssetsHelper::segmentsAsClass() }}">
```

Main project js file which is `app.js`
```blade
<script src="{!!  \App\Helpers\AssetsHelper::elixir('js/app.js')  !!}"></script>
```

To get `first or second route` js file your-website.com/`%first-route%`/*
```blade
{!! \App\Helpers\AssetsHelper::pageScript() !!}
```

# gulp commands and flags
[see documentaion](GULP.md) 

start with:
```
gulp help
```

to view alixir config:
```
gulp config
```

list all your templates files:
```
gulp list --templates
```

list all your version files:
```
gulp list --version
```

to run assets task which into assets.json file:
```
gulp assets
```


## Authors

* **Alan Elias** - *Initial work* - [AlanElias](https://github.com/AlanElias)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


