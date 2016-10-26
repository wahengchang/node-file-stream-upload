# node-file-stream-upload

It is an example of upload file by both streaming and local file in node.js.


## Usage

```js
var uploader = require("./upload.module.js")

uploader.urlUpload('www.abc.com/abc.jpg').then(function(url){ ... })


uploader.fileUpload('.../this/is/file.pg').then(function(url){ ... })

```

## License


[MIT](http://vjpr.mit-license.org)