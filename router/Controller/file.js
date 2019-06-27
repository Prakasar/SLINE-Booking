var express = require('express');
var app = express();
var multer = require('multer');
var formidable = require('formidable');
var fs = require('fs');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './router/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});

var upload = multer({ storage: storage }).single('profileImage');

module.exports.profile=function(req,res){
    
    var url='tested';
    req.on('data', chunk => {
        var c= chunk;
        if(c)
        {
        console.log(c);
        }
    });
        upload(req, res, function (err) {
       
            if (err) {
           
            }else{
                if(req.file);
                {
                    console.log('file have');
                }
               // url= req.file.destination + req.file.filename
                console.log(url);    
            }
        })
        }   
