function makeChart()
{
    var sleepGraphTitle;

    var sleepData = [];

    if (periodChoice === 'day') {
        // Sleep values for a single day.
        sleepData = [4, 2, 2, 5, 6, 5, 4, 1, 2];

        sleepGraphTitle = 'Sleep distribution for day ' + day + '/' + (month + 1) + '/' + year;
    } else if (periodChoice === 'week') {
        var startOfWeek = day - (dayOfWeek - 1); // Calcualte the date of the beginning of the week that contains the user's chosen day.

        // Sleep values for a single week.
        sleepData = [
            4, 2, 2, 5, 6, 5, 4, 1, 2,
            2, 1, 4, 4, 4, 5, 6, 4, 4,
            5, 6, 5, 1, 4, 5, 4, 4, 1,
            4, 4, 4, 5, 6, 5, 5, 4, 4,
            4, 5, 5, 6, 5, 6, 5, 5, 4,
            4, 4, 5, 5, 6, 6, 5, 6, 5, 4, 4,
            5, 5, 5, 6, 4, 4, 5, 6, 5, 4,
        ];

        sleepGraphTitle = 'Sleep distribution for week ' + startOfWeek + '/' + (month + 1) + '/' + year + ' - ' +
            (startOfWeek + 6) + '/' + (month - 1) + '/' + year;
    } else if (periodChoice === 'month') {
        // Sleep values for a single month.
        sleepData = [
            4, 2, 2, 5, 6, 5, 4, 1, 2, 2, 1, 4, 4, 4, 5, 6, 4,
            4, 5, 6, 5, 1, 4, 5, 4, 4, 1, 4, 4, 4, 5, 6, 5, 5,
            4, 4, 4, 5, 5, 6, 5, 6, 5, 5, 4, 4, 4, 5, 5, 6, 6,
            5, 6, 5, 4, 4, 5, 5, 5, 6, 4, 4, 5, 6, 5, 4, 6, 5,
            4, 2, 4, 1, 2, 4, 4, 6, 6, 4, 4, 5, 4, 4, 5, 2, 4,
            6, 4, 4, 4, 4, 4, 4, 1, 3, 1, 4, 4, 4, 6, 2, 2, 4,
            4, 5, 2, 2, 6, 5, 4, 5, 5, 5, 4, 6, 4, 5, 6, 2, 3,
            2, 2, 4, 4, 5, 2, 4, 2, 5, 2, 6, 2, 6, 5, 4, 2, 6,
            6, 5, 6, 5, 4, 4, 2, 6, 6, 5, 2, 6, 4, 2, 2, 4, 5,
            5, 5, 6, 6, 6, 5, 1, 2, 6, 4, 6, 4, 2, 4, 4, 1, 2,
            6, 2, 5, 6, 5, 2, 4, 5, 5, 6, 5, 6, 5, 6, 6, 5, 6,
            5, 5, 2, 2, 4, 6, 6, 6, 6, 2, 6, 6, 6, 5, 4, 6, 4,
            6, 6, 6, 4, 5, 3, 5, 5, 5, 5, 4, 5, 5, 4, 5, 5, 2,
            6, 6, 6, 4, 5, 2, 4, 2, 3, 2, 5, 1, 4, 4, 2, 5, 2,
            4, 6, 5, 5, 2, 6, 5, 2, 5, 6, 2, 6, 5, 2, 4, 5, 6,
            4, 5, 6, 6, 1, 5, 2, 4, 2, 6, 6, 5, 6, 6, 4, 4
        ];

        sleepGraphTitle = 'Sleep distribution for month ' + (month + 1) + '/' + year;
    }

    var typeCounts = {};

// Loop through and count the occurrances of each value.
    for (var i = 0; i < sleepData.length; i++) {
        var sleepType = sleepData[i];

        if (typeCounts[sleepType] === undefined) {
            typeCounts[sleepType] = 1;
        } else {
            typeCounts[sleepType] = typeCounts[sleepType] + 1;
        }
    }

    var distributionData = [];

// Create a slice of the pie chart with the sleep value and its count.
    for (data in typeCounts) {
        dataPoint = {
            name: sleepStatusLabels[data - 1],
            y: typeCounts[data]
        };
        distributionData.push(dataPoint)
    }

    const sleepGraph = Highcharts.chart('sleep-graph', {
        chart: {
            type: 'pie'
        },
        title: {
            text: sleepGraphTitle
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                colors: graphColours,
                // Displays the labels for each slice.
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [{
            name: 'Hours in state',
            colorByPoint: true, // Colour each slice using the array of colours.
            data: distributionData
        }]
    });
}