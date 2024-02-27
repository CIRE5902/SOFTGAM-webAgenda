const calendarEl = document.getElementById('calendario');

let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridDay',
    initialDate: new Date(),
    headerToolbar: false,
    selectable: true,
    locale: 'es',
    slotDuration: '00:30:00',
    slotLabelInterval: '00:30:00',
    allDaySlot: false,
    views: {
        timeGrid: {
            slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: false }
        }
    },
    dateClick: function (info) {
        console.log('Fecha seleccionada:', info.dateStr);
    }
});

document.getElementById('prevButton').addEventListener('click', function () {
    calendar.prev();
    updateCurrentDate(calendar.getDate());
});

document.getElementById('nextButton').addEventListener('click', function () {
    calendar.next();
    updateCurrentDate(calendar.getDate());
});

function updateCurrentDate(date) {
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let formattedDate = day.toString().padStart(2, '0') + '/' + month.toString().padStart(2, '0') + '/' + year;

    document.getElementById('currentDate').textContent = formattedDate;
}

document.getElementById('dateInput').addEventListener('change', function(event) {
    let selectedDate = new Date(event.target.value);
    
    calendar.gotoDate(selectedDate);
    updateCurrentDate(selectedDate);
});

calendar.render();

// updateCurrentDate(new Date());



