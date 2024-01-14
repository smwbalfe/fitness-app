function makeChart() {
    var bpmGraphType;
    var bpmGraphTitle;

    var bpmGraphShareToolTip;
    var bpmGraphLegendEnabled;

    var bpmGaphXLabel;
    var bpmGraphColourBands;

    var bpmGraphStart;
    var bpmGraphInterval;

    var bpmData = [];
    var bpmGraphSeries = [];

    var maxHR = 220 - userAge; // Calculate the maximum heart rate of the user.

    if (periodChoice == 'day') {
        // This hardcoded data represents an average of every 15 minutes of heart rate data for a single day.
        axios({
            method: 'post',
            url: 'http://localhost:3000/query/heartRate',
            data: {
                time: 'day'
            }
        })
        bpmData = [
            54, 52, 53, 56,
            55, 52, 52, 51,
            60, 59, 58, 57,
            55, 54, 56, 55,
            56, 56, 51, 52,
            58, 55, 55, 55,
            57, 54, 53, 52,
            69, 70, 75, 88,
            96, 97, 93, 89,
            87, 84, 81, 78,
            78, 73, 78, 81,
            84, 86, 86, 93,
            98, 109, 103, 96,
            85, 76, 77, 71,
            63, 62, 63, 61,
            81, 83, 85, 89,
            85, 83, 84, 82,
            61, 66, 66, 67,
            152, 159, 143, 132,
            87, 76, 72, 68,
            61, 66, 63, 62,
            64, 65, 69, 65,
            80, 74, 72, 65,
            53, 52, 55, 56
        ];

        bpmGraphType = 'line';
        bpmGraphTitle = 'Average heart rate every 15 minutes throughout day ' + day + '/' + (month + 1) + '/' + year;

        bpmGraphShareToolTip = false;
        bpmGraphLegendEnabled = false;

        bpmGaphXLabel = 'Hours';

        bpmGraphStart = Date.UTC(year, month, day); // Start of x-axis is user's selected date.
        bpmGraphInterval = 15 * 60 * 1000; // The x-axis interval is every 15 minutes throughout the day.

        bpmGraphSeries = [{
            name: 'Average Beats per Minute (BPM)',
            data: bpmData,
            color: graphColours[0]
        }];
    } else if (periodChoice == 'week') {
        var startOfWeek = day - (dayOfWeek - 1); // Calcualte the date of the beginning of the week that contains the user's chosen day.

        axios({
            method: 'post',
            url: 'http://localhost:3000/query/heartRate',
            data: {
                time: 'week'
            }
        })
        // This hardcoded data represents an average of every 30 minutes of heart rate data for a week.
        bpmData = [
            54, 53, 55, 52, 60, 58, 55, 56, 56, 51, 58, 55, 57, 53, 69, 75, 96, 93, 87, 81, 78, 78, 84, 86, 98, 103, 85, 77, 63,
            63, 81, 85, 85, 84, 61, 66, 152, 143, 87, 72, 61, 63, 64, 69, 80, 72, 53, 55, 47, 40, 50, 46, 47, 47, 49, 44, 42, 44,
            41, 46, 48, 47, 97, 68, 66, 83, 97, 89, 71, 74, 73, 81, 80, 85, 87, 95, 89, 61, 100, 82, 100, 91, 74, 81, 148, 131, 147,
            139, 67, 92, 94, 94, 64, 78, 41, 44, 48, 40, 49, 44, 45, 45, 49, 47, 47, 40, 45, 42, 43, 50, 76, 77, 73, 98, 86, 89,
            90, 97, 61, 96, 71, 99, 62, 91, 73, 95, 71, 74, 60, 84, 70, 71, 75, 82, 143, 143, 144, 132, 98, 96, 96, 99, 74, 71, 44,
            48, 47, 41, 41, 48, 48, 48, 49, 43, 45, 45, 46, 50, 85, 92, 81, 75, 94, 64, 81, 94, 79, 93, 66, 93, 73, 75, 100, 85, 71,
            76, 78, 91, 81, 97, 144, 138, 136, 136, 69, 76, 78, 94, 85, 69, 50, 41, 46, 45, 49, 40, 44, 48, 47, 43, 47, 41, 47, 42,
            47, 44, 61, 96, 75, 64, 67, 80, 80, 62, 66, 83, 83, 73, 67, 79, 63, 83, 90, 65, 85, 71, 83, 75, 134, 140, 144, 132, 96,
            71, 94, 99, 91, 96, 49, 47, 47, 43, 45, 59, 49, 40, 59, 40, 51, 58, 60, 48, 58, 57, 100, 63, 89, 63, 68, 68, 94, 61, 72,
            85, 79, 80, 69, 73, 81, 91, 63, 78, 86, 78, 70, 74, 131, 139, 141, 143, 62, 71, 85, 92, 45, 52, 56, 46, 46, 45, 50, 53,
            46, 45, 54, 59, 57, 58, 59, 48, 40, 45, 61, 97, 71, 92, 98, 76, 69, 93, 67, 79, 85, 80, 61, 75, 97, 86, 87, 79, 99, 81,
            79, 85, 140, 148, 149, 150, 90, 90, 62, 97, 71, 76, 47, 41
        ];

        bpmGraphType = 'line';
        bpmGraphTitle = 'Average heart rate every 30 minutes throughout week ' + startOfWeek + '/' + (month + 1) + '/' + year + ' - ' +
            (startOfWeek + 6) + '/' + (month - 1) + '/' + year;

        bpmGraphShareToolTip = false;
        bpmGraphLegendEnabled = false;

        bpmGaphXLabel = 'Hours';
        bpmGraphColourBands = [];

        // Loop through and set the background color of every other day of the week for improved readability.
        for (var i = 1; i < 7; i += 2) {
            band = {
                from: Date.UTC(year, month, startOfWeek + i),
                to: Date.UTC(year, month, startOfWeek + i + 1),
                color: graphColours[graphColours.length - 2]
            };

            bpmGraphColourBands.push(band);
        }

        bpmGraphStart = Date.UTC(year, month, startOfWeek), // Start of x-axis is first day of week containing user's selected date.
            bpmGraphInterval = 30 * 60 * 1000,  // The x-axis interval is every 30 minutes throughout the week.

            bpmGraphSeries = [{
                name: 'Average Beats per Minute (BPM)',
                data: bpmData,
                color: graphColours[0]
            }];
    } else if (periodChoice === 'month') {
        // This hardcoded data represents the maximum, minimum and average of data readings for each day of the month.
        // This array will have to be created from the data receieved from the database.

        axios({
            method: 'post',
            url: 'http://localhost:3000/query/heartRate',
            data: {
                time: 'month'
            }
        })
        bpmData = [
            41, 132, 78,
            40, 134, 73,
            45, 150, 75,
            44, 145, 72,
            45, 135, 76,
            42, 136, 77,
            40, 148, 76,
            43, 138, 72,
            42, 135, 73,
            44, 136, 76,
            41, 132, 77,
            44, 146, 71,
            42, 135, 71,
            40, 130, 71,
            45, 133, 73,
            40, 138, 74,
            45, 131, 76,
            42, 132, 73,
            41, 137, 72,
            45, 140, 75,
            40, 147, 72,
            41, 139, 77,
            43, 144, 70,
            45, 143, 70,
            42, 132, 74,
            41, 140, 73,
            45, 150, 73,
            40, 137, 76,
            41, 150, 74,
            45, 148, 74,
            45, 133, 72,
            42, 159, 75
        ];

        var rangeData = [];
        var averageData = [];

        // Push the data into respective arrays to be displayed in the graph.
        for (var i = 0; i < bpmData.length - 3; i += 3) {
            rangeData.push([bpmData[i], bpmData[i + 1]]);
            averageData.push(bpmData[i + 2]);
        }

        bpmGraphType = 'dumbbell';
        bpmGraphTitle = 'Maximum, minimum and average heart rate per day throughout month ' + (month + 1) + '/' + year;

        bpmGraphShareToolTip = true;
        bpmGraphLegendEnabled = false;

        bpmGaphXLabel = 'Days';

        bpmGraphStart = Date.UTC(year, month, 1); // Start of x-axis is the first day of the month containing the user's chosen date.
        bpmGraphInterval = 24 * 60 * 60 * 1000; // The x-axis interval is every 24 hours of the month.

        bpmGraphSeries = [{
            // Maximum and minimum range graph.
            name: "Heart Rate Range per Day",
            data: rangeData,
            color: graphColours[0],
            lowColor: graphColours[0],
            marker: {
                enabled: true,
            }
        }, {
            // Average graph.
            type: 'line',
            name: "Average",
            data: averageData,
            color: graphColours[2],
            marker: {
                enabled: true,
            }
        }];
    }

    const bpmGraph = Highcharts.chart('bpm-graph', {
        chart: {
            type: bpmGraphType
        },
        title: {
            text: bpmGraphTitle
        },
        tooltip: {
            shared: bpmGraphShareToolTip
        },
        legend: {
            enabled: bpmGraphLegendEnabled
        },
        xAxis: [{
            type: 'datetime', // Generates x-axis based on date object.
            title: {
                text: bpmGaphXLabel
            },
            crosshair: {
                enabled: true,
                width: 2
            },
            plotBands: bpmGraphColourBands
        }],
        yAxis: {
            tickInterval: 20,
            max: 220,
            min: 0,
            title: {
                text: 'Beats per Minute'
            },
            // Display a line showing the users maximum heart rate.
            plotLines: [{
                value: maxHR,
                color: graphColours[graphColours.length - 1],
                label: {
                    text: 'Maximum Heart Rate: ' + maxHR,
                },
                zIndex: 4 // Places line above series.
            }]
        },
        plotOptions: {
            series: {
                pointStart: bpmGraphStart,
                pointInterval: bpmGraphInterval,
                marker: {
                    enabled: false
                }
            }
        },
        series: bpmGraphSeries,
    });
}