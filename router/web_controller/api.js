
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

router.get('/web_booking_staus/:booking_id',doctor.booking_staus);
router.post('/web_doctor_search_seassion',doctor.doctor_seassion_search);
router.get('/web_hospital_list',doctor.hospital_list);
router.get('/web_booking_doc_sister',doctor.doctor_attendance);
router.get('/web_doctor_drp_list',doctor.status_list);
router.get('/web_get_doctor_by_hospital/:hospital_id',doctor.get_doctor_by_hospital_id);
router.get('/web_get_doc_status_details/:doctor_id/:hospital_id',doctor.get_doc_status_details);
module.exports=router;