const express = require('express');

const router = express.Router();

router.get('/', function(req, res) {
    res.send({msg:'auth works',port:process.env.PORT});
});

const registartion=require('../authentication/Controller/registration');
const Authentication=require('../authentication/Controller/login');

router.post('/user_Registration',
  registartion.register
);

router.get('/email_verification/:email_id/:code',registartion.email_verification);

router.post('/Login',function(req,res){
 Authentication.Login(req,res);
});

router.get('/get_user_details/:user_id',function(req,res){
  registartion.user_details(req,res);
 });

router.post('/encrypt',function(req,res){
  Authentication.createCreditintial(req,res);
 });

 
 router.post('/decrypt',function(req,res){
  Authentication.decrypt(req,res);
 });

module.exports = router;