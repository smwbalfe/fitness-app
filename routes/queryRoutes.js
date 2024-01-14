const db = require('../db')
const express = require("express");
const router = express.Router()
const bodyParser = require('body-parser')

router.use(express.urlencoded({extended: true}));
router.use(bodyParser.json());

router.post('/settingsUpdate', async (req ,res) => {
    console.log(req.body);

    await db.query("INSERT INTO settings(userid, fitnessLevel, notifications, privacy) VALUES($1,$2,$3,$4)", [])
    await db.query("UPDATE users SET username = $1",[req.body.username]);

    //await User.findByIdAndUpdate(req.session.userid, req.body);
    //res.redirect('/settings');
})

router.get('/processSleep', async (req ,res) => {
    const time = Date.now();
    const data = await db.
    console.log(data);
})

router.post('/updateProfileView', async(req, res) => {

    let today = new Date(Date.now());
    let formatDate = today.toLocaleDateString();
    let dateParts = formatDate.split('/')
    let newDate = dateParts[2]+"-"+dateParts[1]+"-"+dateParts[0]
    let testDate = '2021-03-04'
    const dataFetch = await db.query("SELECT users.userid, accountName, normaldate AS date,  stepcount ,volume, sleepquality, bedtime, waketime, averagebpm, high, low" +
        "    FROM dailyuserdata INNER JOIN hydration ON hyd = hydrationid" +
        "    INNER JOIN steps ON step=stepsid" +
        "    INNER JOIN sleep ON slee = sleepid" +
        "    INNER JOIN heartrate ON heart = heartrateid" +
        "    INNER JOIN dates ON dailyuserdata.unixid=dates.unixid" +
        "    INNER JOIN users ON users.userid=dailyuserdata.userid WHERE users.userid = $1 AND normaldate =$2", ['116648969612970452763', testDate])

    res.json(dataFetch["rows"][0])

})

router.post('/feedProfileValues', async(req, res) => {
    let today = new Date(Date.now());
    let testToday = '2021-03-02'
    let currentHour = today.getHours();
    const {wakeTime, sleepTime} = req.body;
    const dateFind = await db.query("SELECT unixid FROM dates WHERE normaldate = $1",[testToday])
    const {unixid} = dateFind["rows"][0]
    const hourFind = await db.query("SELECT hoursliceid FROM hour WHERE hour = $1 and unixid = $2", [currentHour, unixid ])
    const {hoursliceid} = hourFind["rows"][0]
    moodMap = {
        "Love": 1
    }
    const mood = moodMap[req.body.mood]
    await db.query("INSERT INTO hourslicedata(hoursliceid, userid, moodValue) VALUES($1,$2,$3)", [hoursliceid, req.session.userid, mood])
    let yesterdayDate = Date.now()
    let yesterday = new Date(yesterdayDate - 86400000);
    let yesterdayFormat = yesterday.toLocaleDateString().split('/');
    let properFormatYesterday = yesterdayFormat[2]+"-"+yesterdayFormat[1]+"-"+yesterdayFormat[0];
    let testYest = '2021-03-01';
    const yestFetch = await db.query("SELECT unixid, date  FROM dates WHERE normaldate =$1", [testYest]);
    let {unixid: unixidYes, date} = yestFetch["rows"][0]
    /* calculate sleep quality here */
    let timePartsSleep = sleepTime.split(":");
    let timePartsWake = wakeTime.split(":")
    let bedtime = +timePartsSleep[0] * (60000 * 60) + (+timePartsSleep[1] * 60000) + (parseInt(date))
    let waketime = +timePartsWake[0] * (60000 * 60) + (+timePartsWake[1] * 60000) + (parseInt(Date.now()))
    await db.query("INSERT INTO sleep(sleepquality, bedtime, waketime) VALUES($1,$2,$3)",[89, bedtime, waketime])
    await db.query("INSERT INTO hydration(volume) VALUES($1)", [parseInt(req.body.glassValue) * 250])
    let recentSleepID = await db.query("SELECT sleepid FROM sleep");
    let recentSleepIDs = recentSleepID["rows"][recentSleepID["rows"].length-1];
    const {sleepid} = recentSleepIDs;
    await db.query("INSERT INTO dailyuserdata(userid, unixid, slee) VALUES($1, $2, $3)" , [ req.session.userid ,  unixidYes, sleepid])
    res.redirect('/profile')

})
router.get('/updateWater', async (req, res) => {

});

router.post('/heartRate', async (req, res) => {

    function createDate(milli){
        let date =  new Date(milli);
        let dateList = date.toLocaleDateString().split('/');
        let properFormat = dateList[2]+"-"+dateList[1]+"-"+dateList[0];
        return properFormat;
    }
    let dayDate = createDate(Date.now());
    let testYest = '2021-03-02';
    const {time} = req.body;
    if (time === 'day'){
        const hourSliceID = await db.query("SELECT unixid FROM dates WHERE normaldate = $1 ",[dateHR])
        let unixid = hourSliceID["rows"][0];
        let dayData = []
        for (let i = 0; i < 24; i++){
            const heartRateDay = await db.query(" SELECT heartRate FROM hourslicedata INNER JOIN hour ON hour.hoursliceid = hourslicedata.hoursliceid WHERE hour.unixid = $1 AND hour.hour = $2 WHERE hourslicedata.userid = $3",[unixid, i, req.session.userid])
            const {heartRate} = heartRateDay["rows"][0]
            for (let x = 0; i< 4; i++){
                dayData.push(heartRate/4)
            }
        }
        res.json({dayData})
    }
    else if (time === 'week'){
        let start = Date.now();
        let testStart = 1615420800000
        let dayIDs = []
        for (let i =0 ; i < 7; i++){
            let weekSelect = createDate(testStart);
            const hourSliceID = await db.query("SELECT unixid FROM dates WHERE normaldate = $1  ",[weekSelect])
            dayIDs.push(hourSliceID["rows"][0])
            testStart -= 86400000;
        }
        console.log(dayIDs)
        let weekdata = []
        for (let z = 0; z< 7; z++){
            for (let i = 0; i < 24; i++){
                const heartRateWeek = await db.query("SELECT heartRate FROM hourslicedata INNER JOIN hour ON hour.hoursliceid = hourslicedata.hoursliceid WHERE hour.unixid = $1 AND hour.hour = $2 WHERE hourslicedata.userid = $3",[dayIDs[z].unixid, i, req.session.userid])
                const {heartRate} = heartRateWeek["rows"][0]
                for (let x = 0; i< 2; i++){
                    weekdata.push(heartRate/2);
                }
            }
        }
        res.json({weekData})
    }
    else if (time === 'month'){

    }
});

router.get('/stepsData');

router.get('/updateMood');



module.exports = router;