
CREATE TABLE users (

    userid PRIMARY KEY,
    accountName VARCHAR(255),
    accountEmail VARCHAR(255),
    username VARCHAR(255),
    profilePicture VARCHAR(255),
    refreshToken VARCHAR(255)

);

CREATE TABLE goals (

    goalID SERIAL PRIMARY KEY,
    userid varchar(255),
    type varchar(255),
    startDate integer,
    goalValue integer,
    status varchar(255),
    FOREIGN KEY(userid) REFERENCES users(userid),
    FOREIGN KEY(startDate) REFERENCES dates(unixID)
);


