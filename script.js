$(document).ready(function () {
    const btn = $("#submitDay");

    const bellSchedule = {
        1: { start: '8:24 AM', end: '9:31 AM' },
        2: { start: '9:36 AM', end: '10:43 AM' },
        3: { start: '10:48 AM', end: '11:55 AM' },
        4: { start: '12:41 PM', end: '1:48 PM' },
        5: { start: '1:53 PM', end: '3:00 PM' }
      }
      const dailyPeriods = {
        A: [1, 2, 3, "Lunch", 5, 6],
        B: [4, 1, 2, "Lunch", 7, 5],
        C: [3, 4, 1, "Lunch", 6, 6],
        D: [2, 3, 4, "Lunch", 5, 6],
        E: [1, 2, 3, "Lunch", 7, 5],
        F: [4, 1, 2, "Lunch", 6, 7],
        G: [3, 4, 7, "Lunch", 5, 6]
    };

    btn.on('click', function () {
        const selectedDay = $("#dayInput").val().trim().toUpperCase();
        if (!["A", "B", "C", "D", "E", "F", "G"].includes(selectedDay)) {
            alert("Please enter a letter day!");
            return;
        }
        $.ajax({
            url: `https://api.npoint.io/1cc58de2a41bbdff2ff9`,
            method: 'GET',
            success: function (data) {
                const schedule = data.schedule
                const daySchedule = schedule.filter(item => 
                    item.days.includes(selectedDay),
                    renderHtml(data)
                )
            },
        });
    })
    function renderHtml(data){

    }
})