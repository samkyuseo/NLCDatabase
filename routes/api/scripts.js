const express = require('express');
const router = express.Router();

//@route api/scripts
//@descript Scripts route
//@access Public

router.get('/', (req, res) => res.send('Scripts Route'));

module.exports = router;
