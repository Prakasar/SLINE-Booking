var express = require('express');
var app = express();
var multer = require('multer');
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
    
   var url= upload(req, res, function (err) {
        if (err) {
            res.send({
                status:false,
                message:'Error in Uploading Image',
                response: err,
            })
        }else{
            res.send({
                status:true,
                message:'Profile Image Uploaded Successfully',
                response:req.file.destination + req.file.filename
            })
        }
    })
}