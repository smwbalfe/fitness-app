
const axios = require('axios');

module.exports.steps = async (req, res) => {



}

module.exports.sleep = async (req, res) => {

    try{
        const result = await axios({

            method: "POST",
            headers: {
                'Authorization': "Bearer " + req.accessToken,
                'Content-Type': "application/json",
                'Accept': 'application/json'
            },
            url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
            data: {
                "aggregateBy": [
                    {
                        "dataTypeName": "com.google.sleep.segment"
                    }
                ],
                'bucketByTime': {durationMillis: 3600000},
                "endTimeMillis": 1610150400000,
                "startTimeMillis": 1610064000000
            }
        });

        const stepArray = result.data.bucket;
        for (const dataSet of stepArray){
            console.log(dataSet);
            for (const points of dataSet.dataset){
                console.log(points)
            }
        }
    }catch(e){
        console.log(e)
    }
}

module.exports.heartRate = async (req, res) => {

    try{
        const result = await axios({

            method: "POST",
            headers: {
                'Authorization': "Bearer " + req.accessToken,
                'Content-Type': "application/json",
                'Accept': 'application/json'
            },
            url: `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`,
            data: {
                "aggregateBy": [
                    {
                        "dataTypeName": "com.google.heart_rate.bpm"
                    }
                ],
                '  bucketByTime': {durationMillis: 3600000},
                "endTimeMillis": 1610150400000,
                "startTimeMillis": 1610064000000
            }
        });

        const stepArray = result.data.bucket;
        for (const dataSet of stepArray){
            console.log(dataSet);
            for (const points of dataSet.dataset){
                console.log(points)
            }
        }
    }catch(e){
        console.log(e)
    }
}

