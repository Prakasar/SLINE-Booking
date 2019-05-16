var connection = require('../../config/config');
var safe = require("../../Helper/safe");
var LINQ = require('jslinq');  //Linq 
var db=require('../../config/Database');
//const database  = new db(config.config);


module.exports.Login = function (req, res) {

    //const database  = new db(config.config);

    try{  
    connection.query('call usp_auth_authentication("'+req.body.UserName+'");',function (err,UserRole){
      console.log(UserRole);
     
        var Credintial = LINQ(UserRole[0]).select(function (s) { return { "password":s.password,"password_key":s.password_parse} }).toList();
        var password='';
        var password_key='';
        var encrypt_pass='';
        if(Credintial[0]){
         password=Credintial[0]["password"];
         password_key=Credintial[0]["password_key"];
        
        }
        if(password && password_key)
        {
         encrypt_pass=safe.decrypt(password,password_key);
        }
        //console.log(encrypt_pass);
        if(req.body.Password==encrypt_pass)
        {
            // var user=LINQ(UserRole[0]).select(function (s) { return { "auth_account_id":s.auth_account_id,"user_id":s.user_id,"username":s.username,"changed_on":s.changed_on,"firstname":s.firstname,"lastname":s.lastname,"dob":s.date_of_birth,"mobile_no":s.mobile_no,"email_address":s.email_address,"designation":s.designation,
            // "user_type_id":s.user_type_id,"user_type":s.user_type,"object_id":s.object_id,"object_organisation_identity_no":s.PRN,
            // "Organisation":{"organisation_name":s.organisation_name,"organisation_short_code":s.organisation_short_code,"organisation_alt_name":s.organisation_alt_name,"organisation_type":s.organisation_type,"organisation_type_id":s.organisation_type_id,"logical_details":{"logical_entity_type_id":s.logical_entity_type_id,"logical_entity_type":s.logical_entity_type,"logical_entity_id":s.logical_entity_id,"logical_entity":s.entity_name}}} }).toList();
            
            // var user_role={"user_id":user[0]["user_id"],"username":user[0]["username"],"email_address":user[0]["email_address"]};
            
         
            // var permission=LINQ(UserRole[1]).select(function (s) { return { "permission_id":s.permission_id,"url_route":s.url_route,"platform_code":s.platform_code,"platform_name":s.platform_name,"platform_id":s.platform_id} }).toList();
            // var role={"role_id":UserRole[1][0]["role_id"],"role_name":UserRole[1][0]["role_name"],"is_sys_admin":UserRole[1][0]["is_sys_admin"],"Permission":permission};
            // var user_role={"user_id":user[0]["user_id"],"username":user[0]["username"],"email_address":user[0]["email_address"],"roles":role};
            //  var Authentication=[];
            //  Authentication.push("User",user);
            //  Authentication.push("User_Role",user_role);
   
             res.send({
                status: true,
                message: 'Login success',
                response: {code: 1,
                    message: "Login Successfully."}
            });
        }else{
            var msg=[];
            msg.push({"error_code":"403","error_message":"user not found"});
            var msg_list=[];
           // msg_list.push("message",msg);

            res.send({
                status: false,
                message: '500/406/403',
                response: msg,
            })
        }
    });
}catch(err)
{
    var msg=[];
    msg.push({"error_code":"403","error_message":"user not found"});
    var msg_list=[];
  //  msg_list.push("message",msg);

    res.send({
        status: false,
        message: '500/406/403',
        response: msg,
    })
}
   
}


module.exports.createCreditintial=function(req,res){
   var encrypted= safe.encrypt(req.body.password,req.body.key);

   res.send({
    status: true,
    details: {encrypted_text:encrypted,key:req.body.key}
});
}