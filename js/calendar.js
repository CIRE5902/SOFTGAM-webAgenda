const calendarEl = document.getElementById('calendario');
let initialView = window.innerWidth > 768 ? 'timeGridWeek' : 'timeGridDay';

let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: initialView,
    initialDate: new Date(),
    headerToolbar: false,
    selectable: true,
    locale: 'es',
    slotDuration: '00:30:00',
    slotLabelInterval: '00:30:00',
    allDaySlot: false,
    slotMinTime: '08:00:00',
    slotMaxTime: '22:30:00',
    views: {
        dayGridDay: { // Configuración específica para la vista de día en móvil
            titleFormat: { day: 'numeric', month: 'numeric', weekday: 'long' }
        },
        timeGrid: {
            slotLabelFormat: { hour: 'numeric', minute: '2-digit', hour12: false }
        }
    },
    dateClick: function (info) {
        console.log('Fecha seleccionada:', info.dateStr);
    }
});

calendar.render();

// function updateCurrentDate(date) {
//     let day = date.getDate();
//     let month = date.getMonth() + 1; 
//     let year = date.getFullYear();
//     let formattedDate = day.toString().padStart(2, '0') + '/' + month.toString().padStart(2, '0') + '/' + year;
//     document.getElementById('currentDate').textContent = formattedDate;
// }

document.getElementById('prevButton').addEventListener('click', function () {
    calendar.prev();
    updateCurrentDate(calendar.getDate());
});

document.getElementById('nextButton').addEventListener('click', function () {
    calendar.next();
    updateCurrentDate(calendar.getDate());
});

document.getElementById('dateInput').addEventListener('change', function (event) {
    let selectedDate = new Date(event.target.value);
    calendar.gotoDate(selectedDate);
    updateCurrentDate(selectedDate);
});

window.addEventListener('resize', function () {
    let newView = window.innerWidth > 768 ? 'timeGridWeek' : 'timeGridDay';
    calendar.changeView(newView);
});
