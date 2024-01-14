const express = require("express");
const router = express.Router()
const bodyParser = require('body-parser')
const catchAsync = require('../utils/catchAsync');
const {logout, renderProfile, renderSettings, renderAnalytics, renderContacts, renderRanking, renderGoals} = require('../controllers/users/usermw')
const {steps, sleep, heartRate} = require('../controllers/API/googleFit')
const {fetchToken, checkLoggedIn , buildProfile, buildSettings} = require('../middleware/middleware')

router.use(express.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/fetchSteps', fetchToken, catchAsync(steps));

router.get('/fetchSleep', fetchToken, catchAsync(sleep));

router.get('/fetchHeartRate' , fetchToken , catchAsync(heartRate))

module.exports = router;