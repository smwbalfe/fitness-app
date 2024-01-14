// Array of colours used by each graph.
const graphColours = ['rgba(3, 119, 252, 1)',
    'rgba(255, 75, 43, 1)',
    'rgba(11, 222, 0, 1)',
    'rgba(185, 32, 245, 1)',
    'rgba(245, 234, 32, 1)',
    'rgba(255, 149, 0, 1)',
    'rgba(235, 244, 255, 1)',
    'rgba(255, 75, 43, 0.5)'];

const sleepStatusLabels = ['Awake (during sleep cycle)', 'Sleep', 'Out-of-bed', 'Light sleep', 'Deep sleep', 'REM'];

// Users age if we have access to it, used to calculate maximum heart rate.
const userAge = 27;

var periodChoice = 'month'; // The period the user has chosen, change to day, week or month to see graph for each period.

let selectedDate = new Date(),
    year, month, day, dayOfWeek;

updateDate();


function updateDate()
{

//var selectedDate = new Date(dateFromUser.year, dateFromUser.month, dateFromUser.day); // Today's date.

// Get the year, month and date values from the selected date to generate new date object from date chosen by the user.
// var selectedDate = new Date(YYYY, MM - 1, DD);

    year = selectedDate.getUTCFullYear(); // Gets the year from date object.
    month = selectedDate.getUTCMonth(); // Gets the month from the date object.
    day = selectedDate.getUTCDate(); // Gets the day from the date objects.

// Gets the day of the week from the date object. This is a number 0-6 representing Sunday-Saturday
    dayOfWeek = selectedDate.getUTCDay();

}