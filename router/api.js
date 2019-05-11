
const express = require('express');

const router = express.Router();
const test=require('./Controller/test');

router.get('firstapi/:name/:mob', test.firstapi
);

router.post('/firstpost', test.firstpost
);

module.exports=router;