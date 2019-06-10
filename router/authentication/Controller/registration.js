var config = require('../../config/config');
const db = require('../../config/Database');
var helper = require('../../Helper/helper');
var path = require('path');
var LINQ = require('jslinq');
var mail = require('../../Helper/mail');
var safe = require("../../Helper/safe");

//const database  = new db(config.config);
module.exports.register = function (req, res) {


  const database = new db(config.config);
  var profile_id = req.body.profile_id;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;
  var dob = req.body.dob;
  var email_id = req.body.email_id;
  var mobile_no = req.body.mobile_no;
  var city = req.body.city;
  var address = req.body.address;
  var pincode = req.body.pincode;
  var phone = req.body.phone;
  var state_id = req.body.state_id;
  var district_id = req.body.district_id;
  var city_id = req.body.city_id;
  var password = req.body.password;
  var pass_parse = 'ASDF93ERT2908IODFG85RVB30';
  var photo_data = req.body.photo_data;
  var enc_pwd = safe.encrypt(req.body.password, pass_parse);
console.log(photo_data);
  var profile_img_url = '';
  if (photo_data) {
    var imageTypeDetected = helper.decodeBase64Image(photo_data);
    var extension = imageTypeDetected;
    var document_name = "/" + mobile_no;
    var location = path.join(__dirname, '../uploads/registration/photo');
    profile_img_url = '/uploads/registration/proof_' + document_name + '.' + extension;
    var status = helper.imageUpload(photo_data, location, document_name);
  }

  database.query('call usp_doc_user_profile(' + profile_id + ',"' + first_name + '","' + last_name + '","' + dob + '","' + email_id + '","' + mobile_no + '","' + city + '","' + address + '","' + pincode + '","' + phone + '",' + state_id + ',' + district_id + ',' + city_id + ',"' + enc_pwd + '","' + pass_parse + '","' + profile_img_url + '");')
    .then(rows => {
      if(profile_id==0)
      {
      var verification_code = rows[0][0]["verification_code"];
      var to = email_id;
      var cc = "rprakashkgm@gmail.com";
      var subject = "Registration Confirmation";
      var html = 'Hello,<br> Please verify your account by clicking the link: \n<a href="http://localhost:4000/account-verified?code=' + verification_code + '&email=' + to + '">Confirm Account</a>';
      try {
        if (profile_id == 0) {
          var status = mail.send_mail(to, subject, html, cc);
        }
      } catch (err) {
        console.log(err);
      }
      res.send({
        status: true,
        message: 'Success',
        response: { 'user_id': rows[0][0]["user_id"], 'user_name': rows[0][0]["user_name"] }
      })
    }else{
      res.send({
        status: true,
        message: 'Profile Successfully updated ',
        response: ''
      })
    }
    }).catch(err => {
      console.log(err);
      res.send({
        status: true,
        message: 'error',
        response: {
          code: 1,
          message: err
        }

      });
    });


}

module.exports.user_details = function (req, res) {
  const database = new db(config.config);
  database.query('call usp_doc_get_user_profile('+req.params.user_id+')')
    .then(rows => {
     res.send({
        status: true,
        message: 'Success',
        response: {
          code: 1,
          message: rows[0]
        }

      });

    }).catch(err => {

      res.send({
        status: false,
        message: 'error',
        response: {
          code: 500,
          message: "server error, try later :" + err.message,
          error_section: "screen_id$ Registration-->verification"
        },
      });

    });
}

module.exports.email_verification = function (req, res) {
  const database = new db(config.config);
  database.query('call usp_doc_email_verification("' + req.params.email_id + '","' + req.params.code + '")')
    .then(rows => {



      res.send({
        status: true,
        message: 'Success',
        response: {
          code: 1,
          message: rows[0]
        }

      });

    }).catch(err => {

      res.send({
        status: false,
        message: 'error',
        response: {
          code: 500,
          message: "server error, try later :" + err.message,
          error_section: "screen_id$ Registration-->verification"
        },
      });

    });
}
