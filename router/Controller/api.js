const express = require('express');

const router = express.Router();
router.get('/', function(req, res) {
    res.send('booking works');
});

const hos_booking=require('../Controller/booking');
router.get('/location_based_hospital_lists/:latitude/:longitude',
  hos_booking.location_based_hospitalList
);
router.get('/doctor_list_of_selected_hopital/:hospital_id',
  hos_booking.doctor_list_of_hospital
);

module.exports = router;