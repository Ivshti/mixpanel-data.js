# mixpanel-data.js

Javascript Client (browser and node) for retrieving data from [Mixpanel](https://mixpanel.com).

Provides a basic client interface to Mixpanel's [Data export API](https://mixpanel.com/docs/api-documentation/data-export-api).

## Install
### Nodejs

`npm install mixpanel-data.js`

### Browser (Bower)

`bower install jamespamplin/mixpanel-data.js`


## Usage

### Nodejs

```js
  var mxApiKey = '...';
  var mxApiSecret = '...';
  var mxClient = require('mixpanel-data.js').client(mxApiKey, mxApiSecret);

  mxClient.get('engage', {} function(err, data) {
    // do something with data
  });
```

### Browser

Built as a UMD in: `mixpanel-data.browser.js`

Minified in: `mixpanel-data.browser.min.js`

Available as `mxData` in the global namespace.

```html
<html>
<head>
    <script src="mixpanel-data.browser.min.js"></script>
</head>
<body>
    <script>
        var mxApiKey = '...';
        var mxApiSecret = '...';
        var mxClient = mxData.client(mxApiKey, mxApiSecret);
        mxClient.get('engage', {} function(err, data) {
            // do something with data
        });
    </script>
</body>
</html>
```
