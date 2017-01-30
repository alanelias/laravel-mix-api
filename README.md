# laravel-mix-api
laravel-mix-api is `npm package` built on top of laravel-mix and webpack, its an easy cleaning solution to CSS / JS mess. Giving you a nice clean structure for organizing all your sites assets whether it is images, javascript files, or stylesheets and keeps the power of SASS, Browserify, versioning at your fingertips in simple commands you might already be familiar with.
**The advantage of this package is breaking down all your project assets files as templates by filtering webpack and dealing with json files without editing gulp** 

## You can use this:
```
npm run watch -- api="templates:customer-service,admin&js&clean&assets:images"
```
or
```
npm run dev -- api="templates:customer-service&css"
```
or
```
npm run dev -- api="assets:images,fonts&clean&compile"
```

**Project**
```
│
├───/public/
│   │ 
│   ├───/build/
│   ├───/css/
│   │   ├───app.css
│   │   ├───app-home.css
│   │   └───app-customer-service.css
│   ├───/js/
│   │   ├───app.js
│   │   ├───app-home.js
│   │   └───app-customer-service.js
│   ├───/fonts/
│   │   ├───/font-awesome/
│   │   ├───/bootstrap/
│   │   └───/custom/
│   └───/images/
│       ├───/package1/
│       ├───/package2/
│       └───/package3/
│
├───/resources/
│   ├───/assets/
│   │   │
│   │   ├────/js/
│   │   │    ├────/common/
│   │   │    ├────/pages/ 
│   │   │    ├────app.js
│   │   │    ├────app-global.js
│   │   │    └────app-admin.js
│   │   │ 
│   │   ├────/sass/
│   │   │    ├────/common/ 
│   │   │    ├────/layouts/
│   │   │    ├────/pages/
│   │   │    └────app.scss 
│   │   │ 
│   │   ├────styles.json (styles tasks api="css")
│   │   │ 
│   │   ├────scripts.json (scripts tasks api="js")
│   │   │ 
│   │   └────assets.json (assets tasks api="assets")
│   │   
│   └───/views/
│      
├───package.json
├───webpack.mix.js (laravel-mix and laravel-mix-api init)
│

```

## Installation 
**npm**  
```
npm install laravel-mix --save-dev

npm install laravel-mix-api --save-dev
```

**Note** if you have this error:
`gulp-notify: [Laravel Elixir] Browserify Failed!: Couldn't find preset "es2015" relative to directory` 
you can fix it by installing the following packages:
```
npm install babel-preset-es2015 --save-dev
npm install babel-preset-react --save-dev
```
 
**On Deploy** run the following commands: 
```
npm run production -- api="assets"
```

## Usage
**webpack.mix.js** 
```
let mix = require('laravel-mix'),
    MixApi = require("laravel-mix-api");
mixApi = new MixApi(mix);
mixApi.setConfig({
    files: {
        styles: "resources/assets/styles.json",
        scripts: "resources/assets/scripts.json",
        assets: "resources/assets/assets.json"
    }, filters: {
        "%bower%": "vendor/bower_dl",
        "%node%": "node_modules",
        "%images%": "public/images",
        "%fonts%": "public/fonts"
    },
    other: {
        chmod: 666
    }
});
mixApi.run();
```

Override api config (files, filters and path) [see documentaion](docs/config.md) 
```json
mixApi.setConfig({
  files: {
    "styles": "styles.json",
    "scripts": "scripts.json",
    "assets": "assets.json"
  },
  "filters": {
    "%bower%": "vendor/bower_dl",
    "%node%": "node_modules",
    "%images%": "public/images",
    "%fonts%": "public/fonts"
  },
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
  }
});
```

Create **styles.json**  [see documentaion](docs/styles.md)
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

Create **scripts.json**  [see documentaion](docs/scripts.md)
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

Create **assets.json** [see documentaion](docs/assets.md)
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
[see documentaion](docs/php.md)
Main project css file witch is `app.css`
```blade
<link href="{!!  \App\Helpers\AssetsHelper::mix('css/app.css')  !!}" rel="stylesheet" />
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
<script src="{!!  \App\Helpers\AssetsHelper::mix('js/app.js')  !!}"></script>
```

To get `first or second route` js file your-website.com/`%first-route%`/*
```blade
{!! \App\Helpers\AssetsHelper::pageScript() !!}
```

# api commands and flags
[see documentaion](docs/help.md) 

start with:
```
npm run dev -- api="help"
```

to view mix api config:
```
npm run dev -- api="config"
```

list all your templates files:
```
npm run dev -- api="list:templates"
```

to run assets task which into assets.json file:
```
npm run dev -- api="assets"
```


## Authors

* **Alan Elias** - *Initial work* - [GitHub](https://github.com/AlanElias) | [LinkedIn](https://www.linkedin.com/in/alanwelias)


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details


