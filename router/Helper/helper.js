
var path = require('path');
var fs = require('fs');
var extension=require('./file_extension');
module.exports.decodeBase64Image = function (dataString) {
 //  console.log(dataString,"dataString");
    var imageTypeRegularExpression = /\/(.*?)$/;
    var matches = dataString.match(/^data:([A-Za-z-+.\/]+);base64,(.+)$/);
    var response = {};
  //console.log("matches :",matches);
    if (!matches && matches.length !== 3) {
        return new Error('Invalid input string');
    }else{
     response.type = matches[1];
    response.data = new Buffer.from(matches[2],'base64');
    var imgType= response.type.match(imageTypeRegularExpression);
    var ext=extension[imgType["input"]];
    return ext;
    }
}

module.exports.imageUpload=function(dataString,targetDir,filename)
{
    
    var imageTypeDetected = module.exports.decodeBase64Image(dataString);
    var base64Data = "";
    base64Data = dataString.split(',')[1];
    let options = { width: 100, height: 100, responseType: 'base64' }
   
    try {

        const sep = path.sep;
        const initDir = path.isAbsolute(targetDir) ? sep : '';
        targetDir.split(sep).reduce((parentDir, childDir) => {
        const curDir = path.resolve(parentDir, childDir);
      //  console.log(`Dir Name: ${curDir}`);
            if (!fs.existsSync(curDir)) {
           ///  console.log('Created');
            fs.mkdirSync(curDir);
         }

         return curDir;
        }, initDir);        

        

        targetDir=targetDir+filename+'.' + imageTypeDetected;
        fs.writeFile(targetDir,base64Data, 'base64', function (err) {
           
          return true;
            });
      
       
    } catch (err) {
       
        console.error(err);
        return false;
    }  
} 



