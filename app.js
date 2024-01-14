/* Require modules */
const express = require('express');
const mongoose  = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const methodOverride = require('method-override');
const ExpressError= require('./utils/ExpressError')
const schedule = require('node-schedule');
const catchAsync = require('./utils/catchAsync');
const {googleLogin, redirect} = require('./controllers/auth/oauth')
const {logout, renderProfile, renderSettings, renderAnalytics, renderContacts, renderRanking, renderGoals, seedDatabase} = require('./controllers/users/usermw')
const {steps, sleep} = require('./controllers/API/googleFit')
const {fetchToken, checkLoggedIn , buildProfile, buildSettings} = require('./middleware/middleware')
const queryRoutes = require('./routes/queryRoutes');
const graphRoutes = require('./routes/graphRoutes')
const apiRoutes = require('./routes/apiRoutes');
const app = express();
app.engine('ejs', ejsMate)
const db = require('./db')

/* ~~~~~~  Configurations ~~~~~~~~~~~~~~~~~~~~~~~~ */
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));
app.set('public', path.join(__dirname, '/public'));
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~ Middleware ~~~~~~~~~~~~*/
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

/* ~~~~~~ Session ~~~~~~ */
const sessionConfig = {
    name: 'Efe Cookie',
    secret: 'EHNkq4hTuqouhx9ag8eREMmu',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    },
}
app.use(session(sessionConfig))
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~~~~Main Route middleware ~~~~~~~~ */
app.use('/query', queryRoutes);
app.use('/graph', graphRoutes);
app.use('/api', apiRoutes);
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

app.get('/', catchAsync(async (req, res) => {
    if (req.session.userid){
        return res.redirect('/profile');
    }
    res.render('index');
}));

app.get('/oauth', googleLogin);

app.get('/googleUser', catchAsync(redirect));

app.get('/contacts', checkLoggedIn, catchAsync(renderContacts));

app.get('/analytics/:path', checkLoggedIn, catchAsync(renderAnalytics));

app.get('/logout', catchAsync(logout));

app.get('/settings', checkLoggedIn , buildSettings, catchAsync(renderSettings));

app.get('/ranking', checkLoggedIn, catchAsync(renderRanking));

app.get("/profile",  checkLoggedIn , buildProfile , catchAsync(renderProfile));

app.get("/goals", checkLoggedIn, catchAsync(renderGoals));

app.get("/seed", seedDatabase);

app.get("*", (req, res, next) => {
    console.log(req.originalUrl)
    next(new ExpressError('page not found', 404));
})

/*********** ERROR HANDLING ********/
app.use((err, req, res, next) => {
    const {statusCode = 500} = err;
    if (!err.message) err.message = 'Oh No, something Went Wrong';
    console.log(err.message);
    res.status(statusCode).render('error', {err})
})
/*************************** */

app.listen(3000, () => {
    console.log("fitnessAPP opened on port 3000");
})

const dailyUpdates = schedule.scheduleJob('* 0 * * * *', () => {

        /* fill the hour database with 0-23 after creating a new unix id*/


    }
)

const hourlyUpdates = schedule.scheduleJob('0 * * * *', () => {


    let today = new Date(Date.now())
    let currentHour = today.getHours();

    /* TODO */
    /* fetch the step count within the current hour from google Fit */
    /* average the bpm from the current hour, minute bucket */

})
