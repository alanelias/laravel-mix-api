# Break down lararvel assets 
**Override php elixir function**
```php
class AssetsHelper
{
    public static function segmentsAsClass()
    {
        $segments = Request::segments();
        return implode('-', $segments);
    }

    public static function pageStyle()
    {

        $segments = Request::segments();
        if (count($segments) > 1) {

            if (!file_exists(public_path('css/app-' . $segments[1] . '.css'))) {
                return "";
            }

            $styleURL = self::elixir('css/app-' . $segments[1] . '.css');


            return '<link rel="stylesheet" href="' . $styleURL . '" />';
        }
        return "";
    }

    public static function pageScript()
    {

        $segments = Request::segments();
        if (count($segments) > 1) {

            if (!file_exists(public_path('js/app-' . $segments[1] . '.js'))) {
                return "";
            }

            $scriptURL = self::elixir('js/app-' . $segments[1] . '.js');


            return '<script src="' . $scriptURL . '"></script>';
        }
        return "";
    }

    public static function elixir($file)
    {
        $manifest_file = public_path('build/rev-manifest.json');

        $manifest = null;

        if (file_exists(public_path('build/rev-manifest.json'))) {

            $manifest = json_decode(file_get_contents($manifest_file), true);

        }

        if (isset($manifest[$file]) && file_exists(public_path('build/' . $manifest[$file]))) {
            return '/build/' . $manifest[$file];

        }
        if (file_exists(public_path($file))) {
            return "/".$file;
        }
        throw new InvalidArgumentException("File {$file} not defined in public/css folder.");

    }
}
```

**Style Page** to style page: 
```
http://your-website.com/dashboard/products/
```
Use this for less or sass:
```scss
// the file would be in pages/dashboard/products
body.dashboard-products {
    // styles here
}
```

**Route With IDs** to style page has id route:
```
http://your-website.com/dashboard/products/25546/
```
You can use this for sass or less:
```scss
// the file would be in pages/dashboard/products/single-product
body[class^="dashboard-products-"], div[class*=" dashboard-products-"] {
    // styles here
}
```

[Go Back](README.md)
