var connection = require('../config/config');
var LINQ = require('jslinq');  //Linq 
var db = require('../config/Database');
var safe = require("../Helper/safe");


module.exports.doctor_specilisation_list = function (req, res) {
    try {
        connection.query('call usp_doc_specilisation_drp();', function (err, specilisation) {

            console.log(specilisation);
            if (specilisation && specilisation.length > 0) {
                res.send({
                    status: true,
                    message: 'doctor specilisation',
                    response: specilisation[0],
                })
            }
            else {
                res.send({
                    status: true,
                    message: 'Data not found',
                    response: []
                })
            }
        });
    } catch (err) {
        res.send({
            status: false,
            message: 'Error occred in add_doctor.js--->doctor_specilisation_list',
            response: err
        })
    }

}

module.exports.doctor_profile_save = function (req, res) {

    let doctor_id = req.body.doctor_id;
    let doc_name = req.body.doc_name;
    let last_name = req.body.last_name;
    let education = req.body.education;
    let mobile_no = req.body.mobile_no;
    let phone_no = req.body.phone_no;
    let email_id = req.body.email_id;
    let specialization_id = req.body.specialization_id;
    let dob = req.body.dob;
    let jod = req.body.jod;
    let experiance = req.body.experiance;
    let description = req.body.description;
    let created_by = req.body.user_id;
    let is_active = req.body.is_active == 1 ? true : false;
    var pass_parse = 'ASDF93ERT2908IODFG85RVB30';
    var enc_pwd = safe.encrypt(req.body.password, pass_parse);
    try {
        let sql_str = 'call usp_doc_doctor_add(?);';
        let sql_params = [doctor_id, doc_name, last_name, education, mobile_no,
            phone_no, email_id, specialization_id, dob, jod,
            experiance, description, created_by, is_active, enc_pwd, pass_parse];
        connection.query(sql_str, [sql_params], function (err, doctor) {

            console.log(doctor);
            if (doctor) {
                res.send({
                    status: true,
                    message: 'Saved',
                    response: doctor,
                })
            }
            else {
                res.send({
                    status: true,
                    message: 'Data not found',
                    response: err
                })
            }
        });
    } catch (err) {
        res.send({
            status: false,
            message: 'Error occred in add_doctor.js--->doctor_specilisation_list',
            response: err
        })
    }

}

module.exports.doctor_list_hospital = function (req, res) {
    try {
        let hospital_id = req.params.hospital_id;
        connection.query('call usp_doc_web_doctor_list(?);', hospital_id, function (err, doctor_list) {

            console.log(doctor_list);
            if (doctor_list && doctor_list.length > 0) {
                res.send({
                    status: true,
                    message: 'doctor list',
                    response: doctor_list[0],
                })
            }
            else {
                res.send({
                    status: true,
                    message: 'Data not found',
                    response: []
                })
            }
        });
    } catch (err) {
        res.send({
            status: false,
            message: 'Error occred in add_doctor.js--->doctor_specilisation_list',
            response: err
        })
    }

}

module.exports.doctor_attendance = function (req, res) {
    try {

        let str_sql = 'call usp_doc_doctor_attendance(?)';
        let params = [req.body.doc_status_id, req.body.doctor_id, req.body.status_on,
             req.body.fromTime, req.body.toTime,req.body.is_available,req.body.status_id,req.body.waiting_time,
            req.body.emergency_delay,req.body.token,req.body.no_of_peopple_in_line,req.body.line_end_time];
        connection.query(str_sql, [params], function (err, attendance) {

            console.log(err);

            res.send({
                status: true,
                message: 'doctor attendance',
                response: attendance,
            })

        });
    } catch (err) {
        res.send({
            status: false,
            message: 'Error occred in web_master.js--->doctor_attendance',
            response: err
        })
    }

}

module.exports.booking_list = function (req, res) {

    try {
        let str = 'call usp_doc_booking_list(? )';
        let params = [req.body.booking_on, req.body.hospital_id];
        connection.query(str, params, function (err, booking) {

            console.log(err);
            if (booking && booking.length > 0) {
                res.send({
                    status: true,
                    message: 'booking list',
                    response: booking,
                })
            }
            else {
                res.send({
                    status: true,
                    message: 'Data not found',
                    response: []
                })
            }
        });
    } catch (err) {
        res.send({
            status: false,
            message: 'Error occred in add_doctor.js--->doctor_specilisation_list',
            response: err
        })
    }

}



module.exports.add_hospital = function (req, res) {
    try {
        var password = req.body.password;
        console.log(req.body.password);
        var pass_parse = 'ASDF93ERT2908IODFG85RVB30';
        var enc_pwd = safe.encrypt(password, pass_parse);
        connection.query('call usp_doc_add_hospital(' + req.body.hospital_id + ',"' + req.body.in_name + '","' + req.body.in_ownere_name + '","' + req.body.in_email_id + '","' + req.body.in_phone_no + '","' + req.body.in_mob_no + '","' + req.body.in_address + '","' + req.body.logourl + '",' + req.body.in_is_active + ',' + req.body.in_latitude + ',' + req.body.in_longitude + ',"' + req.body.in_google_location + '","' + req.body.in_city + '","' + req.body.in_state + '","' + req.body.in_country + '","' + req.body.in_landmark + '","' + req.body.in_specialization + '","' + enc_pwd + '","' + pass_parse + '","' + req.body.in_valid_to + '",'+req.body.in_created_by+');', function (err, appointment) {


            if (err) {
                res.send({
                    status: false,
                    message: 'error',
                    response: err
                });
            } else {
                res.send({
                    status: true,
                    message: ' success',
                    response: appointment
                });
            }
        });

    } catch (err) {
        console.log('error:',err);
        res.send({
            status: false,
            message: 'Error occred when appointment booking.js--->doctor_appointment',
            response: err
        })
    }

}


module.exports.booking_staus = function (req, res) {

    try {
        let str = 'call usp_doc_booking_status(?)';
        let params = [req.params.booking_id];
        connection.query(str, params, function (err, booking) {


            res.send({
                status: true,
                message: 'staus saved',
                response: booking,
            })

        });
    } catch (err) {
        res.send({
            status: false,
            message: 'Error occred in add_doctor.js--->booking_staus',
            response: err
        })
    }

}

module.exports.doctor_seassion_search = function (req, res) {

    try {
        let str = 'call usp_doc_search_doctor_session(?,?,?)';
        let params = [req.body.date_on, req.body.in_session, req.body.hospital_id];
        connection.query(str, params, function (err, booking) {

            if (booking && booking.length > 0) {
                res.send({
                    status: true,
                    message: 'doctor list',
                    response: booking,
                })
            }
            else {
                res.send({
                    status: true,
                    message: 'Data not found',
                    response: []
                })
            }

        });
    } catch (err) {
        res.send({
            status: false,
            message: 'Error occred in add_doctor.js--->doctor_seassion_search',
            response: err
        })
    }

}

module.exports.hospital_list = function (req, res) {
    try {

        connection.query('call usp_doc_hospital_web_list();', function (err, hospital_list) {

            if (hospital_list && hospital_list.length > 0) {
                res.send({
                    status: true,
                    message: 'Hospital  list',
                    response: hospital_list[0],
                })
            }
            else {
                res.send({
                    status: true,
                    message: 'Data not found',
                    response: []
                })
            }
        });
    } catch (err) {
        res.send({
            status: false,
            message: 'Error occred in booking.js--->hospital_search_list',
            response: err
        })
    }

}


module.exports.status_list = function (req, res) {
    try {
        connection.query('call usp_get_doctor_status_list();', function (err, status_list) {

            console.log(status_list);
            if (status_list && status_list.length > 0) {
                res.send({
                    status: true,
                    message: 'patient status',
                    response: status_list[0],
                })
            }
            else {
                res.send({
                    status: true,
                    message: 'Data not found',
                    response: []
                })
            }
        });
    } catch (err) {
        res.send({
            status: false,
            message: 'Error occred in add_doctor.js--->doctor_specilisation_list',
            response: err
        })
    }

}


module.exports.get_doctor_by_hospital_id = function (req, res) {
    try {

        let hospital_id=req.params.hospital_id;
        connection.query('call usp_get_doctor_by_hospital_id(?);',[hospital_id], function (err, status_list) {

            console.log(status_list);
            if (status_list && status_list.length > 0) {
                res.send({
                    status: true,
                    message: 'doctor list',
                    response: status_list[0],
                })
            }
            else {
                res.send({
                    status: true,
                    message: 'Data not found',
                    response: []
                })
            }
        });
    } catch (err) {
        res.send({
            status: false,
            message: 'Error occred in add_doctor.js--->doctor_specilisation_list',
            response: err
        })
    }

}

module.exports.get_doc_status_details = function (req, res) {
    try {
        let doctor_id=req.params.doctor_id;
        let hospital_id=req.params.hospital_id;
        let params=[doctor_id,hospital_id];
        connection.query('call usp_doc_status_details(?);',[params], function (err,status) {

            console.log(err);
            if (status && status.length > 0) {
                res.send({
                    status: true,
                    message: 'doctor status details',
                    response: status[0],
                })
            }
            else {
                res.send({
                    status: true,
                    message: 'Data not found',
                    response: []
                })
            }
        });
    } catch (err) {
        res.send({
            status: false,
            message: 'Error occred in add_doctor.js--->doctor_specilisation_list',
            response: err
        })
    }

}