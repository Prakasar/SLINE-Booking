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

module.exports.hospital_search_list = function (req, res) {
    try{  
        connection.query('call usp_doc_hospital_search("'+req.params.searchText+'");',function (err,hospital_list){

           if(hospital_list&&hospital_list.length>0)
           {
            res.send({
                status: true,
                message: 'Hospital search list',
                response:hospital_list[0],
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
            message: 'Error occred in booking.js--->hospital_search_list',
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

module.exports.doctor_appointment = function (req, res) {
    try{  
        connection.query('call usp_doc_booking('+req.body.doctor_id+','+req.body.hospital_id+',"'+req.body.patient_name+'",'+req.body.patient_mob_no+',"'+req.body.appointment_on+'","'+req.body.timing+'",'+req.body.booked_by+',"'+req.body.purpose+'");',function (err,appointment){

          if(err)
          {
            res.send({
                status: false,
                message: 'error',
                response:err
            });
          }else{
            res.send({
                status: true,
                message: 'appointment success',
                response:appointment,
            });
        }
        });
       
    }catch(err)
    {
        res.send({
            status:false,
            message: 'Error occred when appointment booking.js--->doctor_appointment',
            response:err
                })
    }
 
}

module.exports.doctor_appointment_time_check = function (req, res) {
    try{  
        connection.query('call usp_doc_check_appointment("'+req.body.appointment_time+'",'+req.body.doctor_id+','+req.body.hospital_id+',"'+req.body.appointment_on+'");',function (err,appointment){
console.log(appointment);
          if(!err){
            res.send({
                status: true,
                message: 'appointment time staus',
                response:appointment[0],
            });
        }else{
            res.send({
                status: false,
                message: 'error',
                response:err
            });
        }
        });
       
    }catch(err)
    {
        res.send({
            status:false,
            message: 'Error occred when appointment booking.js--->doctor_appointment_time_check',
            response:err
                })
    }
 
}