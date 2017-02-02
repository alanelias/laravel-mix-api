#### Setup tasks in `webpack.mix.js`:
```js
mixApi = new MixApi(mix);
mixApi.setConfig({/*...Config...*/});
mixApi.setScriptsTasks([/*...script tasks..*/]);
mixApi.setStylesTasks([/*...styles tasks..*/]);
mixApi.setAssetsTasks([/*...Assets tasks..*/]);
mixApi.run();
```


#### Append tasks in `webpack.mix.js`:
```js
mixApi = new MixApi(mix);
mixApi.setConfig({/*...Config...*/});
mixApi.appendScriptsTasks([/*...scripts tasks..*/]);
mixApi.appendStylesTasks([/*...styles tasks..*/]);
mixApi.appendAssetsTasks([/*...Assets tasks..*/]);
mixApi.run();
```


[Go Back](../README.md)