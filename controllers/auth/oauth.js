const {google} = require('googleapis');
const queryParse = require("query-string");
const urlParse = require("url-parse");
const db = require('../../db');

const oauth2Client = new google.auth.OAuth2(
    "739982117038-d6epg8e60f9vkq2dp4fn73tgfrfdn1uo.apps.googleusercontent.com",
    "EHNkq4hTuqouhx9ag8eREMmu",
    "http://localhost:3000/googleUser"
)

module.exports.googleLogin =  (req, res) => {
    console.log("google login controller")
    const scopes = ["https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.sleep.read https://www.googleapis.com/auth/fitness.activity.write profile email openid"]
    const url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes,
    })
    return res.redirect(url);
}

module.exports.redirect = async (req ,res) => {
    console.log("google redirect controller")
    const tokens = await oauth2Client.getToken(queryParse.parse(new urlParse(req.url).query).code);
    const {id_token: token, refresh_token: refreshToken} = tokens.tokens;

    const ticket = await oauth2Client.verifyIdToken({
        idToken: token,
        audience: oauth2Client._clientId
    })

    const payload = ticket.getPayload();
    const userid = payload['sub'];
    const user = await db.query("SELECT userid FROM users WHERE userid = $1", [userid])
    if(!user["rows"][0]){
        const newUser = await db.query(
            "INSERT INTO users (userid, accountName ,accountEmail,profilePicture, refreshToken) VALUES ($1,$2,$3,$4,$5)",
            [userid, payload.name, payload.email,payload.picture, refreshToken]
        );
    }
    req.session.userid = userid;
    res.redirect('/profile');

}