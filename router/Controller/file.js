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
            upload(req, res, function (err,respons) {
                let filePath=req.file.destination+req.file.filename;
                res.send({
                    status: true,
                    message: 'Saved',
                    response:filePath
                })
            });
        }   
