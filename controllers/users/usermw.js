
const db = require('../../db')
module.exports.logout = async (req, res) => {

    req.session.destroy();
    res.redirect('/');

}

module.exports.renderProfile = async (req,res) => {

    console.log(req.data)

    res.render('User/profile', {user: req.user, data: req.data, sleep: req.sleep})

    /*

    * SELECT sleepquality
    *
    */
}

module.exports.renderSettings = async (req, res) => {
    res.render('User/Settings', {user: req.user});
}

module.exports.renderAnalytics = async (req ,res) => {
    let requested_graph = req.params.path;

    if (requested_graph === "Sleep")
    {
        res.render('Analytics/analytics', {graph:"sleep"});
    }
    else if (requested_graph === "HeartRate")
    {
        console.log("test")
        res.render('Analytics/analytics', {graph:"bpm"})
    }
    else
    {
        res.render('Analytics/analytics', {graph:"steps"});
    }
}
module.exports.renderContacts = async (req ,res) => {
    res.render('Contacts/contacts');
}

module.exports.renderRanking = async (req ,res) => {
    let test_data = [["Person A", "10,000 steps"],["Person B", "6000 steps"],["Person C", "1000 steps"],
        ["Person D", "1 step"],["Person E", "0.5 steps"],["Person F", "0.1 steps"]];

    res.render('Leaderboards/leaderboards', {data:test_data});
}

module.exports.renderGoals = async (req ,res) => {

    let data = {}
    res.render("User/goals", {data});
}

module.exports.seedDatabase = async function(){
    //116648969612970452763 - sbmain17@gmail.com
    //115904090325545098035 - slids74432@gmail.com
    let start = 1614556800000;
    let IDs = [211,212,213,214,215,216,217,218,219,220,221]
    let dateIDs = [4,5,6,7,8,9,10,11,12,13,14]
    for (let i = 0; i <= 10; i++){
        let setDate = new Date(start)
        let formalDate = setDate.toLocaleDateString();
        let checkDupe = await db.query("SELECT date FROM dates WHERE date = $1",[start])
        if(!checkDupe["rows"][0]){
            await db.query("INSERT INTO dates(date, normaldate) VALUES($1, $2)",[start, formalDate])
        }

        let primary = []
        const unixIDs = await db.query("SELECT unixID from dates");
        unixIDs["rows"].forEach((item, index) => {
            if (!primary.includes(item.unixid)) {
                primary.push(item.unixid)
            }
        })

        for (let x = 0 ; x <=23; x++){
            let checkDupeHour = await db.query("SELECT hour FROM hour WHERE hour = $1 AND unixid = $2 ",[x, primary[i]])
            if(!checkDupeHour["rows"][0]){
                await db.query("INSERT INTO hour(hour, unixID) VALUES($1, $2)",[x, primary[i]]);
            }
        }

        /*
        const sleepquality = Math.floor(Math.random() * 100)+1;
        let correct = false;
        let bedtime;
        let waketime;
        while (!correct){
            //console.log(start+86399999);
            //console.log(start);
            bedtime = Math.floor(Math.random() * 86400000) + start;
            waketime = Math.floor(Math.random() * 86400000) + start;
            if (bedtime < waketime){
                correct = true
            }
        }
        await db.query("INSERT INTO sleep(sleepquality, bedtime, waketime ) VALUES($1,$2,$3)",[sleepquality, bedtime, waketime])
        */

        /*
        let stepCount = Math.floor(Math.random() * 500000)+500;
        let volume = Math.floor(Math.random() * 100000)+100;
        let averageBPM = Math.floor(Math.random() * 120)+45;
        let bpm = false;
        let high;
        let low;
        while (!bpm){
            high = Math.floor(Math.random() * (200-averageBPM+1)) + averageBPM+1;
            low = Math.floor(Math.random() * averageBPM-30) + 30;
            if ((high > low)){

                bpm = true;
            }
        }
        await db.query("INSERT INTO hydration(volume) VALUES($1)",[volume]);
        await db.query("INSERT INTO steps(stepcount) VALUES ($1)", [stepCount]);
        console.log("average: ", averageBPM, "high: ", high, "low: ", low)
        await db.query("INSERT INTO heartrate(averagebpm, high, low) VALUES ($1, $2, $3)", [averageBPM, high, low])
        */

        await db.query("INSERT INTO dailyuserdata(userid, unixid, hyd, heart,slee,step) VALUES($1,$2,$3,$4,$5,$6)",["116648969612970452763", dateIDs[i], IDs[i],IDs[i],IDs[i]+1,IDs[i]])
        start += 86400000;

    }
}
