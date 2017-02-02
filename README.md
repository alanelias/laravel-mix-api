# laravel-mix-api
laravel-mix-api is `npm package` built on top of laravel-mix and webpack, its an easy cleaning solution to CSS / JS mess. Giving you a nice clean structure for organizing all your sites assets whether it is images, javascript files, or stylesheets and keeps the power of SASS, Browserify, versioning at your fingertips in simple commands you might already be familiar with.
**The advantage of this package is breaking down all your project assets files as templates by filtering webpack and dealing with json files without editing gulp** 

## You can use this:
```
npm run dev -- api="templates:customer-service,admin&js&clean:js,images&assets:images,fonts"
```
or
```
npm run watch -- api="templates:customer-service&css"
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

## Requirements   
```
npm -v ~= 4.1.1  
node -v >= v6.0.0

Global Packages:
npm install webpack babel cross-env autoprefixer -g
```

**On Deploy** run the following command: 
```
npm run production -- api="assets"
```

## Installation
**npm** scripts add `--define` at the end of each line
```
{
  "private": true,
  "scripts": {
    "dev": "cross-env NODE_ENV=development webpack --progress --hide-modules --config=webpack.config.js --define",
    "watch": "cross-env NODE_ENV=development webpack --watch --progress --hide-modules --config=webpack.config.js --define",
    "hot": "cross-env NODE_ENV=development webpack-dev-server --inline --hot --config=webpack.config.js --define",
    "production": "cross-env NODE_ENV=production webpack --progress --hide-modules --config=webpack.config.js --define"
  },
  "devDependencies": {}
  "dependencies": {}
}
```

## Installation
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
    }, 
    alias: {
        "%bower%": "vendor/bower_dl",
        "%node%": "node_modules",
        "%images%": "public/images",
        "%fonts%": "public/fonts"
    }
});
mixApi.run();
```

Override api config (files, filters and path) [see documentaion](docs/config.md) 
```json
mixApi.setConfig({});
```

## Installation
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
        "fileOut": "public/css/app.js",
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
        "fileOut": "public/css/app-home.js",
        "version": "css/app-home.css"
      }
    ]
  }
]
```

## Installation
Create **scripts.json**  [see documentaion](docs/scripts.md)
```json
[
  {
    "template": "app",
    "files": [
      {
        "type": "js",
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
        "type": "js",
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

## Installation
Create **assets.json** [see documentaion](docs/assets.md)
```json
[
  {
    "package": "Bootstrap",
    "files": [
      {
        "tag": "fonts",
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
        "tag": "fonts",
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
        "tag": "images",
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


