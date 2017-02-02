
## Custom Flags

***`npm run dev -- api="do"`***
```js
if(mixApi.argv.isArgv('do')) {
    // your task
    mixApi.abort("do task");
}
mixApi.run();
```

***`npm run dev -- api="do:one,two"`***
```js
var argv = mixApi.argv.getArgValue('do');
if(argv) {
  if(mixApi.argv.inArgv(argv, "one")) {
      // your task
      mixApi.abort("do task one");
  }
  if(mixApi.argv.inArgv(argv, "two")) {
      // your task
      mixApi.abort("do task two");
  }  
}
mixApi.run();
```



[Go Back](../README.md)
