const axios = require('axios');
var qs = require('qs');
const db = require('../db');

module.exports.fetchToken = async (req ,res ,next) => {
    if (!req.session.userid){
        return res.redirect('/')
        next();
    }
    const {refreshToken} = await User.findById(req.session.userid);


    var data = qs.stringify({
        'grant_type': 'refresh_token',
        'refresh_token': refreshToken,
        'valid_for': '60',
        'client_id': '739982117038-d6epg8e60f9vkq2dp4fn73tgfrfdn1uo.apps.googleusercontent.com',
        'client_secret': 'EHNkq4hTuqouhx9ag8eREMmu'
    });
    var config = {
        method: 'post',
        url: 'https://oauth2.googleapis.com/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };
    axios(config)
        .then(function (response) {
            req.accessToken = response.data.access_token;
            next();
        })
        .catch(function (error) {
            console.log(error);
        });
}

module.exports.checkLoggedIn = async (req ,res, next) => {
    if(req.session.userid){
        const user = await db.query("SELECT * FROM users WHERE userid = $1",[req.session.userid]);
        req.user = user["rows"][0];
        next();
    }
    else{
        return res.redirect('/');
    }
}

module.exports.buildProfile = async (req, res, next) => {

    /* boolean to check if there exists some variable called req.sleep containing the data about the sleep otherwise process
    * the data as normal */
    console.log("req.sleep"+req.sleep);
    let today = new Date(Date.now());
    let testToday = '2021-03-02'
    const dateFind = await db.query("SELECT unixid FROM dates WHERE normaldate = $1",[testToday])
    const {unixid} = dateFind["rows"][0]
    const dataFetch = await db.query("SELECT stepcount ,volume, sleepquality, bedtime, waketime, averagebpm, high, low " +
         "FROM dailyuserdata INNER JOIN hydration ON hyd = hydrationid " +
         "INNER JOIN steps ON step=stepsid " +
        "INNER JOIN sleep ON slee = sleepid " +
         "INNER JOIN heartrate ON heart = heartrateid " +
         "INNER JOIN dates ON dailyuserdata.unixid=dates.unixid WHERE dates.unixid = $1 AND dailyuserdata.userid = $2 ",[unixid, req.session.userid]);
    const fetch = dataFetch["rows"][0];

    console.log(fetch)
    const {stepcount, volume, sleepQuality, bedtime, waketime, averagebpm, high, low} = fetch;

    let date = today.toDateString();
    if (req.sleep){
        let bedDate= new Date(parseInt(bedtime))
        let wakeDate = new Date(parseInt(waketime));
        let sleepTime = new Date(parseInt(parseInt(waketime) - parseInt(bedtime)))

        let bedTime = bedDate.toLocaleTimeString();
        let wakeTime = wakeDate.toLocaleTimeString();
        let sleepHours = sleepTime.toLocaleTimeString().substring(0,2)
        let sleepMinutes = sleepTime.toLocaleTimeString().substring(3,5)

        if (sleepHours[0] == 0){

            let index = 0;
            sleepHours =  sleepHours.substring(0, index) +  sleepHours.substring(index + 1);

        }
        if(sleepMinutes[0] === 0){
            let index = 0;
            sleepMinutes =  sleepMinutes.substring(0, index) +  sleepMinutes.substring(index + 1);
        }

        req.data = {
            sleep: {
                quality: sleepQuality,
                wakeTime,
                bedTime,
                change:  '+45%',
                hours: sleepHours,
                minutes: sleepMinutes
            },
            water : {
                volume
            },
            steps: {
                count: stepcount,
                change:  '-23%',
            },
            heart: {
                averagebpm,
                high,
                low
            },
            date
        }
    }
    else{
        req.data = {
            sleep: {
                quality: "",
                waketime: "",
                bedTime: "",
                change:  "",
                hours: "",
                minutes: ""
            },
            water : {
                volume
            },
            steps: {
                count: stepcount,
                change:  '-23%',
            },
            heartRate: {
                averagebpm,
                high,
                low
            },
            date
        }
    }
    next();

}

module.exports.stepsData = async (req, res, next) => {

    next();
}
module.exports.buildSettings = async(req , res, next) => {

    next();

}





