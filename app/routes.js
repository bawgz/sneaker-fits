const { Router } = require('express');
const { submitTrueToSizeRating, calculateTrueToSizeAvg } = require('./controller');

const router = Router();

router.post('/true-to-size-calculations', submitTrueToSizeRating);
router.get('/true-to-size-calculations', calculateTrueToSizeAvg);

module.exports = router;
