var btn = $('#submitDay'); // Selects the button element with the ID 'submitDay' and stores it in the variable 'btn'.

const bellSchedule = { // Defines a constant object 'bellSchedule' that holds start and end times for each period.
  1: { start: '8:24 AM', end: '9:31 AM' }, // Period 1 start and end time.
  2: { start: '9:36 AM', end: '10:43 AM' }, // Period 2 start and end time.
  3: { start: '10:48 AM', end: '11:55 AM' }, // Period 3 start and end time.
  lunch: { start: '11:55 AM', end: '12:36 PM' }, // Lunch start and end time.
  4: { start: '12:41 PM', end: '1:48 PM' }, // Period 4 start and end time.
  5: { start: '1:53 PM', end: '3:00 PM' } // Period 5 start and end time.
};

const dailyPeriods = { // Defines a constant object 'dailyPeriods' that maps each day to its respective periods.
  A: [1, 2, 3, "Lunch", 5, 6], // Day A's schedule.
  B: [4, 1, 2, "Lunch", 7, 5], // Day B's schedule.
  C: [3, 4, 1, "Lunch", 6, 6], // Day C's schedule.
  D: [2, 3, 4, "Lunch", 5, 6], // Day D's schedule.
  E: [1, 2, 3, "Lunch", 7, 5], // Day E's schedule.
  F: [4, 1, 2, "Lunch", 6, 7], // Day F's schedule.
  G: [3, 4, 7, "Lunch", 5, 6] // Day G's schedule.
};

btn.on("click", () => {
  var selectedDay = $('#dayInput').val().toUpperCase(); // Retrieves the value from an input field with ID 'dayInput', converts it to uppercase, and stores it in 'selectedDay'.
  $.ajax({
    url: `https://api.npoint.io/1cc58de2a41bbdff2ff9`,
    method: "GET",
    success: (data) => { // Defines a callback function to execute on successful response.
      const schedule = data.schedule; // Extracts the 'schedule' data from the response.
      const daySchedule = dailyPeriods[selectedDay]; // Retrieves the schedule for the selected day from 'dailyPeriods'.
      $('#scheduleList').empty(); // Clears any existing content in the HTML element with ID 'scheduleList'.
      let bellIndex = 1; // Initializes a variable 'bellIndex' to track the current bell period.

      daySchedule.forEach((period) => { // Loops through each period in the day's schedule.
        if (period === "Lunch") { // Checks if the current period is Lunch.
          const lunchTime = bellSchedule.lunch; // Retrieves the lunch time from 'bellSchedule'.
          $('#scheduleList').append(` 
              <tr>
                <td>Lunch</td>
                <td>${lunchTime.start} - ${lunchTime.end}</td> // Displays lunch start and end time.
                <td colspan="3">Lunch Break</td> // Indicates that this row is for the lunch break.
              </tr>
            `); // Appends a new row to 'scheduleList' for Lunch.
        } else {
          const periodData = schedule.find(item => item.period === period && item.days.includes(selectedDay)); // Searches for the schedule data corresponding to the current period and selected day.
          if (periodData) { // Checks if data for the current period exists.
            const time = bellSchedule[bellIndex]; // Retrieves the time data for the current bell period.
            $('#scheduleList').append(` // Appends a new row for the current period to 'scheduleList'.
                <tr>
                  <td>${period}</td> 
                  <td>${time.start} - ${time.end}</td> 
                  <td>${periodData.class}</td> 
                  <td>${periodData.teacher}</td> 
                  <td>${periodData.room}</td> 
                </tr>
              `);
            bellIndex++; // Increments the bell index for the next period.
          }
        }
      });
    },
    error: () => { // Defines a callback function to execute if the request fails.
      console.log("We connected to the server, but it returned an error."); // Logs an error message to the console.
    },
  });
});
