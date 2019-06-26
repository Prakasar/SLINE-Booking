const express = require('express');

const router = express.Router();
router.get('/', function(req, res) {
    res.send('booking works');
});

const hos_booking=require('../Controller/booking');
const file=require('../Controller/file');
router.get('/location_based_hospital_lists/:latitude/:longitude',
  hos_booking.location_based_hospitalList
);
router.get('/doctor_list_of_selected_hopital/:hospital_id/:booking_on',
  hos_booking.doctor_list_of_hospital
);
router.get('/hospital_search_list/:searchText',
  hos_booking.hospital_search_list
);
router.post('/appointment_book',
  hos_booking.doctor_appointment
);
router.post('/app_usr_select_time_staus',
  hos_booking.doctor_appointment_time_check
);

router.get('/doc_booking_history/:user_id',
  hos_booking.booking_history
);
router.get('/doc_booking_waiting_status/:booking_on/:user_id',
  hos_booking.doctor_appointment_waiting_status
);

router.post('/file',
  file.profile
);

module.exports = router;