//var config=require('../config/config');
var connection = require('../config/config');
var LINQ = require('jslinq');  //Linq 
var db=require('../config/Database');
//const database  = new db(config.config);

module.exports.location_based_hospitalList = function (req, res) {
    try{  
        connection.query('call usp_doc_hospitalList('+req.params.latitude+','+req.params.longitude+');',function (err,hospitalLists){
           
           //console.log(err);
            if(hospitalLists&&hospitalLists.length>0)
           {
            res.send({
                status: true,
                message: 'Location based hospital list',
                response:hospitalLists[0],
            })
        }
        else{
            res.send({
                status:true,
                message: 'Data not found',
                response:[]
            })
        }
        });
    }catch(err)
    {
        res.send({
            status:false,
            message: 'Error occred in booking.js--->location_based_hospitalList',
            response:err
                })
    }
 
}

module.exports.doctor_list_of_hospital = function (req, res) {
    try{  
        connection.query('call usp_doc_doctorList_byHospital('+req.params.hospital_id+');',function (err,doctor_list){
           if(doctor_list&&doctor_list.length>0)
           {
            res.send({
                status: true,
                message: 'doctor list of selected hospital',
                response:doctor_list[0],
            })
        }
        else{
            res.send({
                status:true,
                message: 'Data not found',
                response:[]
            })
        }
        });
    }catch(err)
    {
        res.send({
            status:false,
            message: 'Error occred in booking.js--->doctor_list_of_hospital',
            response:err
                })
    }
 
}