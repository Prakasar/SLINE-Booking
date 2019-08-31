
const express = require('express');

const router = express.Router();
const doctor=require('./web_master');

router.get('/doctor_specilisation_dropdown', doctor.doctor_specilisation_list
);

router.post('/add_doctor_profile',doctor.doctor_profile_save);

router.get('/web_add_doctor_list/:hospital_id',doctor.doctor_list_hospital);
router.post('/web_add_doctor_attendance',doctor.doctor_attendance);
router.post('/web_booking_list',doctor.booking_list);
router.post('/hospital_profile',doctor.add_hospital);



module.exports=router;