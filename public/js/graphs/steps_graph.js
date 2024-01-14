function makeChart()
{
    var stepsGraphTitle;

    var stepsGraphXLabel;

    var stepsGraphAverageLineLabel;

    var stepsGraphStart;
    var stepsGraphInterval;

    var stepsData = [];


    if (periodChoice === 'day') {
        // Step data per hour for a single day.
        stepsData = [0, 0, 0, 0, 0, 0, 0, 22, 102, 231, 97, 76, 467, 234, 113, 61, 104, 216, 45, 56, 34, 26, 0, 0];

        stepsGraphTitle = 'Steps per hour in day ' + day + '/' + (month + 1) + '/' + year;

        stepsGraphXLabel = 'Hours';

        stepsGraphAverageLineLabel = 'Average steps per hour: ';

        stepsGraphStart = Date.UTC(year, month, day); // Start of x-axis is user's selected date.
        stepsGraphInterval = 60 * 60 * 1000; // The x-axis interval is every 60 minutes throughout the day.
    } else if (periodChoice === 'week') {
        var startOfWeek = day - (dayOfWeek - 1); // Calcualte the date of the beginning of the week that contains the user's chosen day.

        // Steps data per day in a week.
        stepsData = [1423, 2378, 4690, 2165, 2387, 7639, 8214];

        stepsGraphTitle = 'Steps per day in week ' + startOfWeek + '/' + (month + 1) + '/' + year + ' - ' +
            (startOfWeek + 6) + '/' + (month - 1) + '/' + year;

        stepsGraphXLabel = 'Day';

        stepsGraphAverageLineLabel = 'Average steps per day: ';

        stepsGraphStart = Date.UTC(year, month, startOfWeek); // Start of x-axis is first day of week containing user's selected date.
        stepsGraphInterval = 24 * 60 * 60 * 1000;  // The x-axis interval is every 24 hours throughout the week.
    } else if (periodChoice == 'month') {
        // Steps data for each day in a  month.
        stepsData = [
            1423, 2378, 4690, 2165, 2387, 7639, 8214, 1884, 979, 3022, 2499, 3042, 9020, 6063, 2221, 3336,
            5450, 3396, 3409, 7052, 8405, 1844, 2575, 4522, 3679, 3488, 10843, 5782, 1239, 2653, 3003
        ];

        stepsGraphTitle = 'Steps per day in month ' + (month + 1) + '/' + year;

        stepsGraphXLabel = 'Day';

        stepsGraphAverageLineLabel = 'Average steps per day: ';

        stepsGraphStart = Date.UTC(year, month, 1); // Start of x-axis is the first day of the month containing the user's chosen date.
        stepsGraphInterval = 24 * 60 * 60 * 1000; // The x-axis interval is every 24 hours of the month.
    }

// Calculate the average steps per hour.
    if (stepsData.length >= 1)
    {
        var averageSteps = Math.round(stepsData.reduce((a, b) => (a + b)) / stepsData.length);
    }

    const stepsGraph = Highcharts.chart('steps-graph', {
        chart: {
            type: 'column'
        },
        title: {
            text: stepsGraphTitle
        },
        legend: {
            enabled: false
        },
        xAxis: {
            type: 'datetime', // Generates x-axis based on date object.
            title: {
                text: stepsGraphXLabel
            }
        },
        yAxis: {
            title: {
                text: 'Steps'
            },
            // Display a line showing the average steps per hour.
            plotLines: [{
                value: averageSteps,
                color: graphColours[graphColours.length - 1],
                label: {
                    text: stepsGraphAverageLineLabel + averageSteps,
                },
                zIndex: 4 // Places line above series.
            }]
        },
        plotOptions: {
            series: {
                pointStart: stepsGraphStart,
                pointInterval: stepsGraphInterval
            }
        },
        series: [{
            name: 'Total steps',
            data: stepsData,
            color: graphColours[0]
        }],
    });
}