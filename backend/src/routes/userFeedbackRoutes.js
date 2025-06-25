const express = require('express');
const router = express.Router();
const userFeedbackController = require('../controller/userFeedbackController')

router.get('/feedback', userFeedbackController.getAllFeedback);
router.post('/feedback', userFeedbackController.storeFeedback);

module.exports = router;