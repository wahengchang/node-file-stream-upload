var S3 = require('s3');
var fs = require('fs');
var stringTool = require('url-string-api');


var fileUpload = function(pathAndFileName){
  return new Promise(function(resolve, reject) {

    var fileName = stringTool.urlFileName(pathAndFileName)

    fs.readFile(pathAndFileName, function(err, data){
        if(err){
          reject('file error')
        }
        var base64Data = data.toString('base64');
        var theFile = new S3.File(fileName, {base64: base64Data});
        theFile.sS3e().then(function(theFile){
          console.log('          '+ fileName+ ' upload success ...');
          resolve(theFile.url())
        });
    });
  });
};

var urlUpload = function(URL) {

    var request = require('request').defaults({ encoding: null });

    return new Promise(function(resolve, reject) {
      request.get(URL, function (error, response, body) {
        var fileName = stringTool.urlFileName(URL)

          if (!error && response.statusCode == 200) {
              data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
              // console.log(data);

              var theFile = new S3.File(fileName, {base64: data});
              theFile.sS3e().then(function(theFile){
                console.log('          '+ fileName+ ' upload success ...');
                resolve(theFile.url())
              });
          }
          else {
            console.log(error)
            reject(error)
          }
      });
    })
}

module.exports.urlUpload = urlUpload;
module.exports.fileUpload = fileUpload;